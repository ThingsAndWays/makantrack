import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
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

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-foreground">Settings</h1>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Suggest next meal (default)</span>
        <Switch checked={suggestionsEnabled} onCheckedChange={onToggleSuggestions} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recalculate from profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRecalculate} className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="settings-age">Age</Label>
                <Input id="settings-age" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Sex</Label>
                <Select value={sex} onValueChange={(v) => setSex(v as Sex)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="settings-weight">Weight (kg)</Label>
                <Input
                  id="settings-weight"
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="settings-height">Height (cm)</Label>
                <Input
                  id="settings-height"
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Activity level</Label>
              <Select value={activityLevel} onValueChange={(v) => setActivityLevel(v as ActivityLevel)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ACTIVITY_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {ACTIVITY_LABELS[level]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Goal</Label>
              <Select value={goal} onValueChange={(v) => setGoal(v as Goal)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GOALS.map((g) => (
                    <SelectItem key={g} value={g}>
                      {GOAL_LABELS[g]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Recalculate Targets
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Edit targets directly</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveTargets} className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="target-calories">Calories (kcal)</Label>
                <Input
                  id="target-calories"
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="target-protein">Protein (g)</Label>
                <Input
                  id="target-protein"
                  type="number"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="target-carbs">Carbs (g)</Label>
                <Input id="target-carbs" type="number" value={carbs} onChange={(e) => setCarbs(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="target-fat">Fat (g)</Label>
                <Input id="target-fat" type="number" value={fat} onChange={(e) => setFat(e.target.value)} />
              </div>
            </div>
            <Button type="submit" variant="outline" className="w-full">
              Save Targets
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
