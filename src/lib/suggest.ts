import { FOODS } from '../data/foods'
import type { Food, MealSlot, Targets } from '../types'

export function currentMealSlot(date: Date = new Date()): MealSlot {
  const hour = date.getHours()
  if (hour >= 5 && hour < 11) return 'Breakfast'
  if (hour >= 11 && hour < 15) return 'Lunch'
  if (hour >= 17 && hour < 22) return 'Dinner'
  return 'Snack'
}

// Scores how well a value uses up the remaining budget for one macro
// dimension: close to 1 = uses the remaining budget well without exceeding
// it, drops off sharply the further it overshoots.
function scoreDimension(value: number, remaining: number): number {
  if (remaining <= 0) return value === 0 ? 1 : 0
  if (value > remaining) {
    const overshoot = (value - remaining) / remaining
    return Math.max(0, 1 - overshoot)
  }
  return value / remaining
}

export function suggestNextMeal(remaining: Targets, count = 3): Food[] {
  const candidates = FOODS.filter(
    (f) => f.calories <= Math.max(remaining.calories * 1.15, 150),
  )
  const pool = candidates.length > 0 ? candidates : FOODS

  const scored = pool.map((food) => {
    const score =
      scoreDimension(food.calories, remaining.calories) * 0.4 +
      scoreDimension(food.protein, remaining.protein) * 0.3 +
      scoreDimension(food.carbs, remaining.carbs) * 0.15 +
      scoreDimension(food.fat, remaining.fat) * 0.15
    return { food, score }
  })

  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, count).map((s) => s.food)
}
