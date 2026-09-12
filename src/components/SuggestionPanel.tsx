import { Plus, Sparkles } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { Food, Targets } from '../types'

interface SuggestionPanelProps {
  suggestions: Food[]
  remaining: Targets
  onAdd: (food: Food) => void
}

export default function SuggestionPanel({ suggestions, remaining, onAdd }: SuggestionPanelProps) {
  const budgetExhausted = remaining.calories <= 0

  return (
    <Alert className="border-primary/30 bg-primary/5">
      <AlertTitle className="text-primary flex items-center gap-1.5">
        <Sparkles className="size-4" />
        Suggested next makan
      </AlertTitle>
      {budgetExhausted && (
        <AlertDescription>You're at or over your calorie target — these are the lightest options.</AlertDescription>
      )}
      <div className="flex flex-col gap-2 mt-2">
        {suggestions.map((food) => (
          <Card key={food.id} size="sm" className="flex-row items-center justify-between gap-2 px-3 py-2">
            <div>
              <p className="text-sm font-medium text-foreground">{food.name}</p>
              <p className="text-xs text-muted-foreground">
                {food.calories} kcal · P {food.protein}g · C {food.carbs}g · F {food.fat}g
              </p>
            </div>
            <Button size="xs" onClick={() => onAdd(food)} className="shrink-0">
              <Plus className="size-3.5" />
              Add
            </Button>
          </Card>
        ))}
      </div>
    </Alert>
  )
}
