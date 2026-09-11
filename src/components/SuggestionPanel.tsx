import type { Food, MealSlot, Targets } from '../types'

interface SuggestionPanelProps {
  mealSlot: MealSlot
  suggestions: Food[]
  remaining: Targets
  onAdd: (food: Food) => void
}

export default function SuggestionPanel({ mealSlot, suggestions, remaining, onAdd }: SuggestionPanelProps) {
  const budgetExhausted = remaining.calories <= 0

  return (
    <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 p-3">
      <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300 mb-2">
        Suggested for {mealSlot}
      </p>
      {budgetExhausted && (
        <p className="text-xs text-emerald-700 dark:text-emerald-400 mb-2">
          You're at or over your calorie target — these are the lightest options.
        </p>
      )}
      <div className="flex flex-col gap-2">
        {suggestions.map((food) => (
          <div
            key={food.id}
            className="flex items-center justify-between gap-2 bg-white dark:bg-gray-800 rounded-md px-3 py-2"
          >
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{food.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {food.calories} kcal · P {food.protein}g · C {food.carbs}g · F {food.fat}g
              </p>
            </div>
            <button
              onClick={() => onAdd(food)}
              className="shrink-0 px-2.5 py-1 rounded-md bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
