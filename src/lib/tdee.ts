import type { ActivityLevel, Goal, Targets, UserProfile } from '../types'

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
}

export const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: 'Sedentary (little to no exercise)',
  light: 'Light (exercise 1-3 days/week)',
  moderate: 'Moderate (exercise 3-5 days/week)',
  active: 'Active (exercise 6-7 days/week)',
  very_active: 'Very Active (hard exercise + physical job)',
}

export const GOAL_LABELS: Record<Goal, string> = {
  lose: 'Lose weight',
  maintain: 'Maintain weight',
  gain: 'Gain weight',
}

const GOAL_ADJUSTMENT: Record<Goal, number> = {
  lose: -0.2,
  maintain: 0,
  gain: 0.15,
}

// Mifflin-St Jeor equation
function calcBMR(profile: UserProfile): number {
  const { sex, weightKg, heightCm, age } = profile
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age
  return sex === 'male' ? base + 5 : base - 161
}

export function calcTargets(profile: UserProfile): Targets {
  const bmr = calcBMR(profile)
  const tdee = bmr * ACTIVITY_MULTIPLIERS[profile.activityLevel]
  const calories = Math.round(tdee * (1 + GOAL_ADJUSTMENT[profile.goal]))

  const proteinG = Math.round(1.6 * profile.weightKg)
  const proteinCal = proteinG * 4
  const fatCal = calories * 0.25
  const fatG = Math.round(fatCal / 9)
  const carbsCal = Math.max(calories - proteinCal - fatCal, 0)
  const carbsG = Math.round(carbsCal / 4)

  return { calories, protein: proteinG, carbs: carbsG, fat: fatG }
}
