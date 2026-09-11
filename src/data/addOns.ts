import type { AddOn } from '../types'

// Common hawker add-ons/extras — mostly protein, plus a few frequent sides.
export const ADD_ONS: AddOn[] = [
  { id: 'addon-drumstick', name: 'Chicken Drumstick', calories: 150, protein: 15, carbs: 2, fat: 9 },
  { id: 'addon-fried-egg', name: 'Fried Egg', calories: 90, protein: 6, carbs: 1, fat: 7 },
  { id: 'addon-half-boiled-egg', name: 'Half-Boiled Egg', calories: 70, protein: 6, carbs: 1, fat: 5 },
  { id: 'addon-char-siu', name: 'Extra Char Siu (Roast Meat)', calories: 120, protein: 10, carbs: 3, fat: 8 },
  { id: 'addon-luncheon-meat', name: 'Luncheon Meat Slice', calories: 95, protein: 4, carbs: 2, fat: 8 },
  { id: 'addon-sausage', name: 'Sausage', calories: 80, protein: 4, carbs: 2, fat: 6 },
  { id: 'addon-fish-cutlet', name: 'Extra Fish Cutlet', calories: 130, protein: 14, carbs: 4, fat: 6 },
  { id: 'addon-ikan-bilis', name: 'Extra Ikan Bilis & Peanuts', calories: 80, protein: 3, carbs: 4, fat: 6 },
  { id: 'addon-tofu', name: 'Extra Tofu', calories: 70, protein: 6, carbs: 2, fat: 4 },
  { id: 'addon-vegetables', name: 'Extra Vegetables', calories: 30, protein: 2, carbs: 5, fat: 0 },
]
