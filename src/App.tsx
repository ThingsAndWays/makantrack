import { useState } from 'react'
import Dashboard from './components/Dashboard'
import LogFood from './components/LogFood'
import Onboarding from './components/Onboarding'
import Settings from './components/Settings'
import TabBar, { type Tab } from './components/TabBar'
import { currentMealSlot } from './lib/suggest'
import { calcTargets } from './lib/tdee'
import {
  addLogEntry,
  getLogsForDate,
  getPreferences,
  getProfile,
  getTargets,
  hasOnboarded,
  removeLogEntry,
  saveProfile,
  savePreferences,
  saveTargets,
} from './lib/storage'
import type { AddOn, Food, LogEntry, Targets, UserProfile } from './types'

export default function App() {
  const [onboarded, setOnboarded] = useState(hasOnboarded())
  const [profile, setProfile] = useState<UserProfile | null>(getProfile())
  const [targets, setTargets] = useState<Targets | null>(getTargets())
  const [logs, setLogs] = useState<LogEntry[]>(getLogsForDate())
  const [suggestionsEnabled, setSuggestionsEnabled] = useState(getPreferences().suggestionsEnabled)
  const [tab, setTab] = useState<Tab>('dashboard')

  function handleOnboardingComplete(newProfile: UserProfile) {
    const newTargets = calcTargets(newProfile)
    saveProfile(newProfile)
    saveTargets(newTargets)
    setProfile(newProfile)
    setTargets(newTargets)
    setOnboarded(true)
  }

  function handleAddFood(food: Food, multiplier: number, addOns: AddOn[] = []) {
    const addOnCalories = addOns.reduce((sum, a) => sum + a.calories, 0)
    const addOnProtein = addOns.reduce((sum, a) => sum + a.protein, 0)
    const addOnCarbs = addOns.reduce((sum, a) => sum + a.carbs, 0)
    const addOnFat = addOns.reduce((sum, a) => sum + a.fat, 0)
    const entry: LogEntry = {
      id: crypto.randomUUID(),
      foodId: food.id,
      name: food.name,
      servingMultiplier: multiplier,
      calories: Math.round(food.calories * multiplier + addOnCalories),
      protein: Math.round(food.protein * multiplier + addOnProtein),
      carbs: Math.round(food.carbs * multiplier + addOnCarbs),
      fat: Math.round(food.fat * multiplier + addOnFat),
      mealSlot: currentMealSlot(),
      loggedAt: new Date().toISOString(),
      addOns: addOns.length > 0 ? addOns.map((a) => a.name) : undefined,
    }
    setLogs(addLogEntry(entry))
  }

  function handleAddCustomFood(name: string, calories: number, protein: number, carbs: number, fat: number) {
    const entry: LogEntry = {
      id: crypto.randomUUID(),
      foodId: 'custom',
      name,
      servingMultiplier: 1,
      calories: Math.round(calories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat),
      mealSlot: currentMealSlot(),
      loggedAt: new Date().toISOString(),
      isCustom: true,
    }
    setLogs(addLogEntry(entry))
  }

  function handleRemoveEntry(id: string) {
    setLogs(removeLogEntry(id))
  }

  function handleToggleSuggestions(enabled: boolean) {
    savePreferences({ suggestionsEnabled: enabled })
    setSuggestionsEnabled(enabled)
  }

  function handleSaveProfile(newProfile: UserProfile, newTargets: Targets) {
    saveProfile(newProfile)
    saveTargets(newTargets)
    setProfile(newProfile)
    setTargets(newTargets)
  }

  function handleSaveTargets(newTargets: Targets) {
    saveTargets(newTargets)
    setTargets(newTargets)
  }

  if (!onboarded || !profile || !targets) {
    return (
      <div className="min-h-screen bg-background">
        <Onboarding onComplete={handleOnboardingComplete} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-16 sm:pb-0">
      <TabBar active={tab} onChange={setTab} />
      {tab === 'dashboard' && (
        <Dashboard
          targets={targets}
          logs={logs}
          suggestionsEnabled={suggestionsEnabled}
          onToggleSuggestions={handleToggleSuggestions}
          onRemoveEntry={handleRemoveEntry}
          onAddSuggested={(food) => handleAddFood(food, 1)}
        />
      )}
      {tab === 'log' && <LogFood onAdd={handleAddFood} onAddCustom={handleAddCustomFood} />}
      {tab === 'settings' && (
        <Settings
          profile={profile}
          targets={targets}
          suggestionsEnabled={suggestionsEnabled}
          onSaveProfile={handleSaveProfile}
          onSaveTargets={handleSaveTargets}
          onToggleSuggestions={handleToggleSuggestions}
        />
      )}
    </div>
  )
}
