import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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

  return (
    <Card size="sm">
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="custom-name">Food name</Label>
            <Input
              id="custom-name"
              type="text"
              placeholder="e.g. Homemade Sandwich"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="custom-calories">Calories (kcal)</Label>
              <Input
                id="custom-calories"
                type="number"
                min={0}
                placeholder="0"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="custom-protein">Protein (g)</Label>
              <Input
                id="custom-protein"
                type="number"
                min={0}
                placeholder="0"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="custom-carbs">Carbs (g)</Label>
              <Input
                id="custom-carbs"
                type="number"
                min={0}
                placeholder="0"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="custom-fat">Fat (g)</Label>
              <Input
                id="custom-fat"
                type="number"
                min={0}
                placeholder="0"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" disabled={!isValid} className="w-full">
            Add to Log
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
