import { useState } from 'react'
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
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 flex flex-col gap-2">
      <div>
        <p className="font-medium text-gray-900 dark:text-gray-100">{food.name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {food.servingDesc} ≈ {formatFists(food.fistEquivalent)} ✊
        </p>
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-300">
        {Math.round(totalCalories)} kcal · P {Math.round(totalProtein)}g · C {Math.round(totalCarbs)}g · F{' '}
        {Math.round(totalFat)}g
      </p>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">Your portion:</span>
          <div className="flex items-center rounded-md border border-gray-300 dark:border-gray-600 overflow-hidden">
            <button
              type="button"
              onClick={() => adjust(-FIST_STEP)}
              disabled={fists <= MIN_FISTS}
              className="px-2 py-1 text-sm text-gray-600 dark:text-gray-300 disabled:opacity-30"
              aria-label="Fewer fists"
            >
              −
            </button>
            <span className="px-2 py-1 text-sm font-medium text-gray-900 dark:text-gray-100 min-w-[4.5rem] text-center">
              {formatFists(fists)} ✊
            </span>
            <button
              type="button"
              onClick={() => adjust(FIST_STEP)}
              disabled={fists >= MAX_FISTS}
              className="px-2 py-1 text-sm text-gray-600 dark:text-gray-300 disabled:opacity-30"
              aria-label="More fists"
            >
              +
            </button>
          </div>
        </div>
        <button
          onClick={() => onAdd(food, multiplier, selectedAddOns)}
          className="px-3 py-1.5 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
        >
          Add
        </button>
      </div>

      <button
        type="button"
        onClick={() => setShowExtras((prev) => !prev)}
        className="self-start text-xs font-medium text-emerald-700 dark:text-emerald-400"
      >
        {showExtras ? '− Hide extras' : `+ Add extras${selectedAddOns.length > 0 ? ` (${selectedAddOns.length})` : ''}`}
      </button>

      {showExtras && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {ADD_ONS.map((addOn) => {
            const selected = selectedAddOnIds.has(addOn.id)
            return (
              <button
                key={addOn.id}
                type="button"
                onClick={() => toggleAddOn(addOn.id)}
                className={`px-2 py-1 rounded-full text-xs border ${
                  selected
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600'
                }`}
              >
                {selected ? '✓ ' : '+ '}
                {addOn.name} ({addOn.calories} kcal)
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function formatFists(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1)
}
