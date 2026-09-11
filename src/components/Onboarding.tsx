import { useState } from 'react'
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
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-1">Welcome to MakanTrack</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Tell us a bit about yourself so we can calculate your daily calorie and macro targets.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
            Age
            <input
              type="number"
              min={10}
              max={100}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
            Sex
            <select
              value={sex}
              onChange={(e) => setSex(e.target.value as Sex)}
              className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
            Weight (kg)
            <input
              type="number"
              min={20}
              max={300}
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
            Height (cm)
            <input
              type="number"
              min={100}
              max={250}
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
          Activity level
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
            className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2"
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
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value as Goal)}
            className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2"
          >
            {GOALS.map((g) => (
              <option key={g} value={g}>
                {GOAL_LABELS[g]}
              </option>
            ))}
          </select>
        </label>

        {preview && (
          <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-3 text-sm text-emerald-800 dark:text-emerald-300">
            <p className="font-medium mb-1">Your daily targets:</p>
            <p>
              {preview.calories} kcal · Protein {preview.protein}g · Carbs {preview.carbs}g · Fat {preview.fat}g
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={!isValid}
          className="mt-2 w-full py-2.5 rounded-md bg-emerald-600 text-white font-medium hover:bg-emerald-700 disabled:opacity-50"
        >
          Get Started
        </button>
      </form>
    </div>
  )
}
