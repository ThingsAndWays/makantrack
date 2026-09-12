import { Sparkles, Trash2, UtensilsCrossed } from 'lucide-react'
import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { suggestNextMeal } from '../lib/suggest'
import type { Food, LogEntry, Targets } from '../types'
import CalorieGauge from './CalorieGauge'
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

  const suggestions = useMemo(() => suggestNextMeal(remaining, 3), [remaining])

  const today = new Date().toLocaleDateString('en-SG', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Today</h1>
        <p className="text-sm text-muted-foreground">{today}</p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center">
          <CalorieGauge consumed={consumed.calories} target={targets.calories} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-3">
          <ProgressBar label="Protein" consumed={consumed.protein} target={targets.protein} unit="g" indicatorClassName="bg-blue-500" />
          <ProgressBar label="Carbs" consumed={consumed.carbs} target={targets.carbs} unit="g" indicatorClassName="bg-amber-500" />
          <ProgressBar label="Fat" consumed={consumed.fat} target={targets.fat} unit="g" indicatorClassName="bg-purple-500" />
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
          <Sparkles className="size-4 text-primary" />
          Suggest next meal
        </span>
        <Switch checked={suggestionsEnabled} onCheckedChange={onToggleSuggestions} />
      </div>

      {suggestionsEnabled && (
        <SuggestionPanel suggestions={suggestions} remaining={remaining} onAdd={onAddSuggested} />
      )}

      <Card>
        <CardHeader>
          <CardTitle>Logged today</CardTitle>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-6 text-center">
              <UtensilsCrossed className="size-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">Nothing logged yet — head to Log Food.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {logs.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between gap-2 rounded-md border border-border px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {entry.name}
                      {entry.servingMultiplier !== 1 ? ` (${entry.servingMultiplier}x)` : ''}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {entry.mealSlot} · {entry.calories} kcal · P {entry.protein}g · C {entry.carbs}g · F {entry.fat}g
                    </p>
                    {entry.addOns && entry.addOns.length > 0 && (
                      <p className="text-xs text-primary">+ {entry.addOns.join(', ')}</p>
                    )}
                  </div>
                  <Button variant="destructive" size="icon-xs" onClick={() => onRemoveEntry(entry.id)} aria-label="Remove entry">
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
