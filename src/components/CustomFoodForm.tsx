import { useState } from 'react'

interface CustomFoodFormProps {
  onAdd: (name: string, calories: number, protein: number, carbs: number, fat: number) => void
}

export default function CustomFoodForm({ onAdd }: CustomFoodFormProps) {
  const [name, setName] = useState('')
  const [calories, setCalories] = useState('')
  const [protein, setProtein] = useState('')
  const [carbs, setCarbs] = useState('')
  const [fat, setFat] = useState('')

  const isValid = name.trim().length > 0 && calories !== '' && Number(calories) >= 0

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) return
    onAdd(name.trim(), Number(calories), Number(protein) || 0, Number(carbs) || 0, Number(fat) || 0)
    setName('')
    setCalories('')
    setProtein('')
    setCarbs('')
    setFat('')
  }

  const inputClass =
    'rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
      <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-300">
        Food name
        <input
          type="text"
          placeholder="e.g. Homemade Sandwich"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-300">
          Calories (kcal)
          <input
            type="number"
            min={0}
            placeholder="0"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-300">
          Protein (g)
          <input
            type="number"
            min={0}
            placeholder="0"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-300">
          Carbs (g)
          <input
            type="number"
            min={0}
            placeholder="0"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-300">
          Fat (g)
          <input
            type="number"
            min={0}
            placeholder="0"
            value={fat}
            onChange={(e) => setFat(e.target.value)}
            className={inputClass}
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={!isValid}
        className="w-full py-2 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-50"
      >
        Add to Log
      </button>
    </form>
  )
}
