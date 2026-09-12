import {
  Coffee,
  Croissant,
  CupSoda,
  Drumstick,
  Egg,
  IceCreamCone,
  Popcorn,
  Salad,
  SearchIcon,
  SearchX,
  Soup,
  Utensils,
  UtensilsCrossed,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Toggle } from '@/components/ui/toggle'
import { FOOD_CATEGORIES, FOODS } from '../data/foods'
import type { AddOn, Food, FoodCategory } from '../types'
import CustomFoodForm from './CustomFoodForm'
import FoodCardComponent from './FoodCard'
import PortionGuide from './PortionGuide'

const CATEGORY_ICONS: Record<FoodCategory, typeof Utensils> = {
  'Rice & Noodles': Utensils,
  'Soups & Stews': Soup,
  Breakfast: Egg,
  'Snacks & Street Food': Popcorn,
  Drinks: CupSoda,
  Desserts: IceCreamCone,
  Western: Drumstick,
  Japanese: UtensilsCrossed,
  'Bakery & Pastries': Croissant,
}

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
      <h1 className="text-xl font-semibold text-foreground">Log Food</h1>

      <PortionGuide />

      <div className="relative">
        <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search dishes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        <Toggle
          pressed={category === 'All'}
          onPressedChange={() => setCategory('All')}
          variant="outline"
          size="sm"
          className="shrink-0 h-auto rounded-full px-3 py-1.5 gap-1.5 aria-pressed:bg-primary aria-pressed:text-primary-foreground aria-pressed:border-primary"
        >
          <Salad className="size-3.5" />
          All
        </Toggle>
        {FOOD_CATEGORIES.map((cat) => {
          const Icon = CATEGORY_ICONS[cat]
          return (
            <Toggle
              key={cat}
              pressed={category === cat}
              onPressedChange={() => setCategory(cat)}
              variant="outline"
              size="sm"
              className="shrink-0 h-auto rounded-full px-3 py-1.5 gap-1.5 aria-pressed:bg-primary aria-pressed:text-primary-foreground aria-pressed:border-primary"
            >
              <Icon className="size-3.5" />
              {cat}
            </Toggle>
          )
        })}
      </div>

      <div className="flex flex-col gap-2">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <SearchX className="size-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">No dishes match your search.</p>
          </div>
        ) : (
          filtered.map((food) => <FoodCardComponent key={food.id} food={food} onAdd={onAdd} />)
        )}
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <div className="flex items-center gap-1.5">
          <Coffee className="size-4 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">Others</p>
        </div>
        <p className="text-xs text-muted-foreground">Can't find it above? Log any other food directly.</p>
        <CustomFoodForm onAdd={onAddCustom} />
      </div>
    </div>
  )
}
