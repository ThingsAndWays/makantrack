import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Toggle } from '@/components/ui/toggle'
import { ADD_ONS } from '../data/addOns'
import type { AddOn, Food } from '../types'

const FIST_STEP = 0.5
const MIN_FISTS = 0.5
const MAX_FISTS = 6

interface FoodCardProps {
  food: Food
  onAdd: (food: Food, multiplier: number, addOns: AddOn[]) => void
}

export default function FoodCard({ food, onAdd }: FoodCardProps) {
  const [fists, setFists] = useState(food.fistEquivalent)
  const [showExtras, setShowExtras] = useState(false)
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<Set<string>>(new Set())
  const multiplier = fists / food.fistEquivalent

  const selectedAddOns = ADD_ONS.filter((a) => selectedAddOnIds.has(a.id))
  const totalCalories = food.calories * multiplier + selectedAddOns.reduce((sum, a) => sum + a.calories, 0)
  const totalProtein = food.protein * multiplier + selectedAddOns.reduce((sum, a) => sum + a.protein, 0)
  const totalCarbs = food.carbs * multiplier + selectedAddOns.reduce((sum, a) => sum + a.carbs, 0)
  const totalFat = food.fat * multiplier + selectedAddOns.reduce((sum, a) => sum + a.fat, 0)

  function adjust(delta: number) {
    setFists((prev) => Math.min(MAX_FISTS, Math.max(MIN_FISTS, Math.round((prev + delta) / FIST_STEP) * FIST_STEP)))
  }

  function toggleAddOn(id: string) {
    setSelectedAddOnIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <Card size="sm">
      <CardContent className="flex flex-col gap-2">
        <div>
          <p className="font-medium text-foreground">{food.name}</p>
          <p className="text-xs text-muted-foreground">
            {food.servingDesc} ≈ {formatFists(food.fistEquivalent)} ✊
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          {Math.round(totalCalories)} kcal · P {Math.round(totalProtein)}g · C {Math.round(totalCarbs)}g · F{' '}
          {Math.round(totalFat)}g
        </p>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Your portion:</span>
            <div className="flex items-center rounded-md border border-input overflow-hidden">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => adjust(-FIST_STEP)}
                disabled={fists <= MIN_FISTS}
                aria-label="Fewer fists"
              >
                −
              </Button>
              <span className="px-2 text-sm font-medium text-foreground min-w-[4.5rem] text-center">
                {formatFists(fists)} ✊
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => adjust(FIST_STEP)}
                disabled={fists >= MAX_FISTS}
                aria-label="More fists"
              >
                +
              </Button>
            </div>
          </div>
          <Button size="sm" onClick={() => onAdd(food, multiplier, selectedAddOns)}>
            Add
          </Button>
        </div>

        <Button
          type="button"
          variant="link"
          size="sm"
          onClick={() => setShowExtras((prev) => !prev)}
          className="self-start h-auto p-0"
        >
          {showExtras ? '− Hide extras' : `+ Add extras${selectedAddOns.length > 0 ? ` (${selectedAddOns.length})` : ''}`}
        </Button>

        {showExtras && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {ADD_ONS.map((addOn) => {
              const selected = selectedAddOnIds.has(addOn.id)
              return (
                <Toggle
                  key={addOn.id}
                  pressed={selected}
                  onPressedChange={() => toggleAddOn(addOn.id)}
                  variant="outline"
                  size="sm"
                  className="h-auto rounded-full px-2.5 py-1 aria-pressed:bg-primary aria-pressed:text-primary-foreground aria-pressed:border-primary"
                >
                  {selected ? '✓ ' : '+ '}
                  {addOn.name} ({addOn.calories} kcal)
                </Toggle>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function formatFists(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1)
}
