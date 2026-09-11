import { useMemo } from 'react'
import { currentMealSlot, suggestNextMeal } from '../lib/suggest'
import type { Food, LogEntry, Targets } from '../types'
import ProgressBar from './ProgressBar'
import SuggestionPanel from './SuggestionPanel'

interface DashboardProps {
  targets: Targets
  logs: LogEntry[]
  suggestionsEnabled: boolean
  onToggleSuggestions: (enabled: boolean) => void
  onRemoveEntry: (id: string) => void
  onAddSuggested: (food: Food) => void
}

export default function Dashboard({
  targets,
  logs,
  suggestionsEnabled,
  onToggleSuggestions,
  onRemoveEntry,
  onAddSuggested,
}: DashboardProps) {
  const consumed = useMemo(
    () =>
      logs.reduce(
        (acc, e) => ({
          calories: acc.calories + e.calories,
          protein: acc.protein + e.protein,
          carbs: acc.carbs + e.carbs,
          fat: acc.fat + e.fat,
        }),
        { calories: 0, protein: 0, carbs: 0, fat: 0 },
      ),
    [logs],
  )

  const remaining: Targets = {
    calories: Math.max(targets.calories - consumed.calories, 0),
    protein: Math.max(targets.protein - consumed.protein, 0),
    carbs: Math.max(targets.carbs - consumed.carbs, 0),
    fat: Math.max(targets.fat - consumed.fat, 0),
  }

  const mealSlot = currentMealSlot()
  const suggestions = useMemo(() => suggestNextMeal(remaining, 3), [remaining])

  const today = new Date().toLocaleDateString('en-SG', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Today</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">{today}</p>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <ProgressBar label="Calories" consumed={consumed.calories} target={targets.calories} unit="kcal" colorClass="bg-emerald-500" />
        <ProgressBar label="Protein" consumed={consumed.protein} target={targets.protein} unit="g" colorClass="bg-blue-500" />
        <ProgressBar label="Carbs" consumed={consumed.carbs} target={targets.carbs} unit="g" colorClass="bg-amber-500" />
        <ProgressBar label="Fat" consumed={consumed.fat} target={targets.fat} unit="g" colorClass="bg-purple-500" />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Suggest next meal</span>
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

      {suggestionsEnabled && (
        <SuggestionPanel mealSlot={mealSlot} suggestions={suggestions} remaining={remaining} onAdd={onAddSuggested} />
      )}

      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Logged today</p>
        {logs.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-500">Nothing logged yet — head to Log Food.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {logs.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between gap-2 rounded-md border border-gray-200 dark:border-gray-700 px-3 py-2"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {entry.name}
                    {entry.servingMultiplier !== 1 ? ` (${entry.servingMultiplier}x)` : ''}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {entry.mealSlot} · {entry.calories} kcal · P {entry.protein}g · C {entry.carbs}g · F {entry.fat}g
                  </p>
                  {entry.addOns && entry.addOns.length > 0 && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      + {entry.addOns.join(', ')}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => onRemoveEntry(entry.id)}
                  className="shrink-0 text-xs text-red-600 dark:text-red-400 font-medium px-2 py-1"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
