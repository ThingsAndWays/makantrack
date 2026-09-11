import { useMemo, useState } from 'react'
import { FOOD_CATEGORIES, FOODS } from '../data/foods'
import type { AddOn, Food, FoodCategory } from '../types'
import CustomFoodForm from './CustomFoodForm'
import FoodCardComponent from './FoodCard'
import PortionGuide from './PortionGuide'

interface LogFoodProps {
  onAdd: (food: Food, multiplier: number, addOns: AddOn[]) => void
  onAddCustom: (name: string, calories: number, protein: number, carbs: number, fat: number) => void
}

export default function LogFood({ onAdd, onAddCustom }: LogFoodProps) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<FoodCategory | 'All'>('All')

  const filtered = useMemo(() => {
    return FOODS.filter((f) => {
      const matchesQuery = f.name.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === 'All' || f.category === category
      return matchesQuery && matchesCategory
    })
  }, [query, category])

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 flex flex-col gap-4">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Log Food</h1>

      <PortionGuide />

      <input
        type="text"
        placeholder="Search dishes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
      />

      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setCategory('All')}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border ${
            category === 'All'
              ? 'bg-emerald-600 text-white border-emerald-600'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600'
          }`}
        >
          All
        </button>
        {FOOD_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border ${
              category === cat
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-500">No dishes match your search.</p>
        ) : (
          filtered.map((food) => <FoodCardComponent key={food.id} food={food} onAdd={onAdd} />)
        )}
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Others</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Can't find it above? Log any other food directly.</p>
        </div>
        <CustomFoodForm onAdd={onAddCustom} />
      </div>
    </div>
  )
}
