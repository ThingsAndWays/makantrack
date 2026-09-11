import { useState } from 'react'
import { ACTIVITY_LABELS, calcTargets, GOAL_LABELS } from '../lib/tdee'
import type { ActivityLevel, Goal, Sex, Targets, UserProfile } from '../types'

interface SettingsProps {
  profile: UserProfile
  targets: Targets
  suggestionsEnabled: boolean
  onSaveProfile: (profile: UserProfile, targets: Targets) => void
  onSaveTargets: (targets: Targets) => void
  onToggleSuggestions: (enabled: boolean) => void
}

const ACTIVITY_LEVELS: ActivityLevel[] = ['sedentary', 'light', 'moderate', 'active', 'very_active']
const GOALS: Goal[] = ['lose', 'maintain', 'gain']

export default function Settings({
  profile,
  targets,
  suggestionsEnabled,
  onSaveProfile,
  onSaveTargets,
  onToggleSuggestions,
}: SettingsProps) {
  const [age, setAge] = useState(String(profile.age))
  const [sex, setSex] = useState<Sex>(profile.sex)
  const [weightKg, setWeightKg] = useState(String(profile.weightKg))
  const [heightCm, setHeightCm] = useState(String(profile.heightCm))
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(profile.activityLevel)
  const [goal, setGoal] = useState<Goal>(profile.goal)

  const [calories, setCalories] = useState(String(targets.calories))
  const [protein, setProtein] = useState(String(targets.protein))
  const [carbs, setCarbs] = useState(String(targets.carbs))
  const [fat, setFat] = useState(String(targets.fat))

  function handleRecalculate(e: React.FormEvent) {
    e.preventDefault()
    const newProfile: UserProfile = {
      age: Number(age),
      sex,
      weightKg: Number(weightKg),
      heightCm: Number(heightCm),
      activityLevel,
      goal,
    }
    const newTargets = calcTargets(newProfile)
    setCalories(String(newTargets.calories))
    setProtein(String(newTargets.protein))
    setCarbs(String(newTargets.carbs))
    setFat(String(newTargets.fat))
    onSaveProfile(newProfile, newTargets)
  }

  function handleSaveTargets(e: React.FormEvent) {
    e.preventDefault()
    onSaveTargets({
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fat: Number(fat),
    })
  }

  const inputClass =
    'rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2'

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Settings</h1>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Suggest next meal (default)
        </span>
        <button
          onClick={() => onToggleSuggestions(!suggestionsEnabled)}
          className={`relative w-11 h-6 rounded-full transition-colors ${
            suggestionsEnabled ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-600'
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
              suggestionsEnabled ? 'translate-x-5' : ''
            }`}
          />
        </button>
      </div>

      <form onSubmit={handleRecalculate} className="flex flex-col gap-3">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Recalculate from profile</p>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
            Age
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
            Sex
            <select value={sex} onChange={(e) => setSex(e.target.value as Sex)} className={inputClass}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
            Weight (kg)
            <input
              type="number"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
            Height (cm)
            <input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              className={inputClass}
            />
          </label>
        </div>
        <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
          Activity level
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
            className={inputClass}
          >
            {ACTIVITY_LEVELS.map((level) => (
              <option key={level} value={level}>
                {ACTIVITY_LABELS[level]}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
          Goal
          <select value={goal} onChange={(e) => setGoal(e.target.value as Goal)} className={inputClass}>
            {GOALS.map((g) => (
              <option key={g} value={g}>
                {GOAL_LABELS[g]}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="w-full py-2.5 rounded-md bg-emerald-600 text-white font-medium hover:bg-emerald-700"
        >
          Recalculate Targets
        </button>
      </form>

      <form onSubmit={handleSaveTargets} className="flex flex-col gap-3">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Edit targets directly</p>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
            Calories (kcal)
            <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
            Protein (g)
            <input type="number" value={protein} onChange={(e) => setProtein(e.target.value)} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
            Carbs (g)
            <input type="number" value={carbs} onChange={(e) => setCarbs(e.target.value)} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
            Fat (g)
            <input type="number" value={fat} onChange={(e) => setFat(e.target.value)} className={inputClass} />
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2.5 rounded-md border border-emerald-600 text-emerald-600 font-medium hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
        >
          Save Targets
        </button>
      </form>
    </div>
  )
}
