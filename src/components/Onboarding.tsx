import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ACTIVITY_LABELS, calcTargets, GOAL_LABELS } from '../lib/tdee'
import type { ActivityLevel, Goal, Sex, UserProfile } from '../types'

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void
}

const ACTIVITY_LEVELS: ActivityLevel[] = ['sedentary', 'light', 'moderate', 'active', 'very_active']
const GOALS: Goal[] = ['lose', 'maintain', 'gain']

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [age, setAge] = useState('30')
  const [sex, setSex] = useState<Sex>('male')
  const [weightKg, setWeightKg] = useState('70')
  const [heightCm, setHeightCm] = useState('170')
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate')
  const [goal, setGoal] = useState<Goal>('maintain')

  const ageNum = Number(age)
  const weightNum = Number(weightKg)
  const heightNum = Number(heightCm)
  const isValid = ageNum > 0 && weightNum > 0 && heightNum > 0

  const preview = isValid
    ? calcTargets({ age: ageNum, sex, weightKg: weightNum, heightCm: heightNum, activityLevel, goal })
    : null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) return
    onComplete({ age: ageNum, sex, weightKg: weightNum, heightCm: heightNum, activityLevel, goal })
  }

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-semibold text-foreground mb-1">Welcome to MakanTrack</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Tell us a bit about yourself so we can calculate your daily calorie and macro targets.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" min={10} max={100} value={age} onChange={(e) => setAge(e.target.value)} />
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
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              min={20}
              max={300}
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              min={100}
              max={250}
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

        {preview && (
          <Alert className="border-primary/30 bg-primary/5">
            <AlertTitle className="text-primary">Your daily targets:</AlertTitle>
            <AlertDescription>
              {preview.calories} kcal · Protein {preview.protein}g · Carbs {preview.carbs}g · Fat {preview.fat}g
            </AlertDescription>
          </Alert>
        )}

        <Button type="submit" disabled={!isValid} className="mt-2 w-full" size="lg">
          Get Started
        </Button>
      </form>
    </div>
  )
}
