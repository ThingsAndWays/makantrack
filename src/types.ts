export type FoodCategory =
  | 'Rice & Noodles'
  | 'Soups & Stews'
  | 'Breakfast'
  | 'Snacks & Street Food'
  | 'Drinks'
  | 'Desserts'
  | 'Western'
  | 'Japanese'

export interface Food {
  id: string
  name: string
  category: FoodCategory
  servingDesc: string
  calories: number
  protein: number
  carbs: number
  fat: number
  /** How many closed fists (~1 cup / 250ml each) the standard serving above is roughly equivalent to. */
  fistEquivalent: number
}

export type Sex = 'male' | 'female'

export type ActivityLevel =
  | 'sedentary'
  | 'light'
  | 'moderate'
  | 'active'
  | 'very_active'

export type Goal = 'lose' | 'maintain' | 'gain'

export interface UserProfile {
  age: number
  sex: Sex
  weightKg: number
  heightCm: number
  activityLevel: ActivityLevel
  goal: Goal
}

export interface Targets {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export type MealSlot = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'

export interface AddOn {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface LogEntry {
  id: string
  foodId: string
  name: string
  servingMultiplier: number
  calories: number
  protein: number
  carbs: number
  fat: number
  mealSlot: MealSlot
  loggedAt: string
  addOns?: string[]
  isCustom?: boolean
}

export interface Preferences {
  suggestionsEnabled: boolean
}
