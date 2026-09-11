import type { Food } from '../types'

// Calorie/macro values are estimates for a typical hawker-stall serving,
// referenced loosely against Singapore HPB "Energy & Nutrient Composition
// of Food" figures and comparable Malaysian dishes. Treat as approximate.
//
// fistEquivalent: how many closed fists (~1 cup/250ml each) the serving
// above is roughly the volume of — used for the fist-based portion guide.
export const FOODS: Food[] = [
  // Rice & Noodles
  { id: 'nasi-lemak', name: 'Nasi Lemak (egg, ikan bilis, peanuts, sambal)', category: 'Rice & Noodles', servingDesc: '1 plate', calories: 450, protein: 12, carbs: 55, fat: 20, fistEquivalent: 2 },
  { id: 'chicken-rice', name: 'Chicken Rice', category: 'Rice & Noodles', servingDesc: '1 plate', calories: 600, protein: 30, carbs: 70, fat: 20, fistEquivalent: 2 },
  { id: 'char-kway-teow', name: 'Char Kway Teow', category: 'Rice & Noodles', servingDesc: '1 plate', calories: 740, protein: 20, carbs: 80, fat: 35, fistEquivalent: 2.5 },
  { id: 'laksa', name: 'Laksa', category: 'Rice & Noodles', servingDesc: '1 bowl', calories: 600, protein: 20, carbs: 55, fat: 35, fistEquivalent: 2 },
  { id: 'mee-goreng', name: 'Mee Goreng', category: 'Rice & Noodles', servingDesc: '1 plate', calories: 550, protein: 15, carbs: 70, fat: 22, fistEquivalent: 2 },
  { id: 'wonton-mee', name: 'Wonton Mee (dry)', category: 'Rice & Noodles', servingDesc: '1 bowl', calories: 450, protein: 20, carbs: 55, fat: 15, fistEquivalent: 1.5 },
  { id: 'hokkien-mee', name: 'Fried Hokkien Mee', category: 'Rice & Noodles', servingDesc: '1 plate', calories: 600, protein: 25, carbs: 65, fat: 25, fistEquivalent: 2 },
  { id: 'nasi-goreng', name: 'Nasi Goreng', category: 'Rice & Noodles', servingDesc: '1 plate', calories: 500, protein: 15, carbs: 65, fat: 18, fistEquivalent: 2 },
  { id: 'mee-rebus', name: 'Mee Rebus', category: 'Rice & Noodles', servingDesc: '1 bowl', calories: 480, protein: 15, carbs: 65, fat: 16, fistEquivalent: 1.5 },
  { id: 'nasi-biryani', name: 'Chicken Biryani', category: 'Rice & Noodles', servingDesc: '1 plate', calories: 700, protein: 30, carbs: 85, fat: 25, fistEquivalent: 2.5 },
  { id: 'cai-png', name: 'Economical Rice (1 meat, 2 veg)', category: 'Rice & Noodles', servingDesc: '1 plate', calories: 550, protein: 25, carbs: 60, fat: 20, fistEquivalent: 2 },
  { id: 'roti-canai', name: 'Roti Canai with Curry', category: 'Rice & Noodles', servingDesc: '1 piece', calories: 300, protein: 6, carbs: 35, fat: 15, fistEquivalent: 1 },
  { id: 'prawn-mee', name: 'Prawn Noodle Soup (Hae Mee)', category: 'Rice & Noodles', servingDesc: '1 bowl', calories: 500, protein: 22, carbs: 55, fat: 18, fistEquivalent: 1.5 },
  { id: 'yong-tau-foo', name: 'Yong Tau Foo with Noodles', category: 'Rice & Noodles', servingDesc: '1 bowl', calories: 400, protein: 20, carbs: 45, fat: 14, fistEquivalent: 1.5 },
  { id: 'char-siu-rice', name: 'Char Siu Rice', category: 'Rice & Noodles', servingDesc: '1 plate', calories: 600, protein: 25, carbs: 70, fat: 22, fistEquivalent: 2 },

  // Soups & Stews
  { id: 'bak-kut-teh', name: 'Bak Kut Teh with Rice', category: 'Soups & Stews', servingDesc: '1 bowl + rice', calories: 550, protein: 25, carbs: 45, fat: 30, fistEquivalent: 2 },
  { id: 'fish-soup', name: 'Fish Soup with Rice', category: 'Soups & Stews', servingDesc: '1 bowl + rice', calories: 400, protein: 25, carbs: 45, fat: 12, fistEquivalent: 1.5 },
  { id: 'sup-tulang', name: 'Sup Tulang', category: 'Soups & Stews', servingDesc: '1 bowl', calories: 500, protein: 30, carbs: 20, fat: 32, fistEquivalent: 1.5 },
  { id: 'curry-chicken-rice', name: 'Curry Chicken with Rice', category: 'Soups & Stews', servingDesc: '1 plate', calories: 600, protein: 28, carbs: 60, fat: 25, fistEquivalent: 2 },
  { id: 'sup-kambing', name: 'Sup Kambing', category: 'Soups & Stews', servingDesc: '1 bowl', calories: 450, protein: 30, carbs: 15, fat: 28, fistEquivalent: 1.5 },

  // Breakfast
  { id: 'kaya-toast-set', name: 'Kaya Toast + 2 Soft-Boiled Eggs', category: 'Breakfast', servingDesc: '1 set', calories: 400, protein: 14, carbs: 40, fat: 20, fistEquivalent: 1.5 },
  { id: 'roti-prata-plain', name: 'Roti Prata (plain, 2 pieces)', category: 'Breakfast', servingDesc: '2 pieces', calories: 350, protein: 6, carbs: 40, fat: 18, fistEquivalent: 1 },
  { id: 'nasi-lemak-bungkus', name: 'Nasi Lemak Bungkus (breakfast pack)', category: 'Breakfast', servingDesc: '1 pack', calories: 350, protein: 8, carbs: 45, fat: 14, fistEquivalent: 1 },
  { id: 'thosai', name: 'Plain Thosai with Curry', category: 'Breakfast', servingDesc: '1 piece', calories: 250, protein: 6, carbs: 40, fat: 8, fistEquivalent: 1 },
  { id: 'half-boiled-eggs', name: 'Half-Boiled Eggs', category: 'Breakfast', servingDesc: '2 eggs', calories: 140, protein: 12, carbs: 1, fat: 10, fistEquivalent: 0.5 },
  { id: 'chwee-kueh', name: 'Chwee Kueh', category: 'Breakfast', servingDesc: '5 pieces', calories: 250, protein: 5, carbs: 40, fat: 8, fistEquivalent: 1 },

  // Snacks & Street Food
  { id: 'satay-chicken', name: 'Chicken Satay with Peanut Sauce', category: 'Snacks & Street Food', servingDesc: '5 sticks', calories: 350, protein: 25, carbs: 15, fat: 20, fistEquivalent: 1 },
  { id: 'popiah', name: 'Popiah', category: 'Snacks & Street Food', servingDesc: '1 roll', calories: 200, protein: 6, carbs: 30, fat: 6, fistEquivalent: 1 },
  { id: 'curry-puff', name: 'Curry Puff', category: 'Snacks & Street Food', servingDesc: '1 piece', calories: 180, protein: 4, carbs: 18, fat: 10, fistEquivalent: 0.5 },
  { id: 'otah', name: 'Otah', category: 'Snacks & Street Food', servingDesc: '2 pieces', calories: 150, protein: 10, carbs: 5, fat: 10, fistEquivalent: 0.5 },
  { id: 'fishball-skewer', name: 'Fishball Skewers', category: 'Snacks & Street Food', servingDesc: '5 pieces', calories: 120, protein: 10, carbs: 10, fat: 4, fistEquivalent: 0.5 },
  { id: 'ngoh-hiang', name: 'Ngoh Hiang', category: 'Snacks & Street Food', servingDesc: '2 pieces', calories: 200, protein: 10, carbs: 15, fat: 12, fistEquivalent: 0.5 },
  { id: 'rojak', name: 'Rojak', category: 'Snacks & Street Food', servingDesc: '1 serving', calories: 350, protein: 6, carbs: 50, fat: 14, fistEquivalent: 1.5 },
  { id: 'keropok-lekor', name: 'Keropok Lekor', category: 'Snacks & Street Food', servingDesc: '5 pieces', calories: 250, protein: 8, carbs: 30, fat: 10, fistEquivalent: 1 },
  { id: 'vadai', name: 'Vadai', category: 'Snacks & Street Food', servingDesc: '1 piece', calories: 150, protein: 5, carbs: 18, fat: 7, fistEquivalent: 0.5 },
  { id: 'murtabak', name: 'Chicken Murtabak', category: 'Snacks & Street Food', servingDesc: '1 slice', calories: 350, protein: 15, carbs: 30, fat: 18, fistEquivalent: 1 },

  // Drinks
  { id: 'teh-tarik', name: 'Teh Tarik', category: 'Drinks', servingDesc: '1 cup', calories: 120, protein: 3, carbs: 18, fat: 4, fistEquivalent: 1 },
  { id: 'kopi', name: 'Kopi (with condensed milk)', category: 'Drinks', servingDesc: '1 cup', calories: 90, protein: 2, carbs: 14, fat: 3, fistEquivalent: 1 },
  { id: 'kopi-o', name: 'Kopi O (black, with sugar)', category: 'Drinks', servingDesc: '1 cup', calories: 30, protein: 0, carbs: 8, fat: 0, fistEquivalent: 1 },
  { id: 'milo-dinosaur', name: 'Milo Dinosaur', category: 'Drinks', servingDesc: '1 glass', calories: 350, protein: 8, carbs: 55, fat: 12, fistEquivalent: 1.5 },
  { id: 'sugarcane-juice', name: 'Sugarcane Juice', category: 'Drinks', servingDesc: '1 cup', calories: 180, protein: 0, carbs: 45, fat: 0, fistEquivalent: 1 },
  { id: 'bandung', name: 'Bandung', category: 'Drinks', servingDesc: '1 glass', calories: 150, protein: 3, carbs: 28, fat: 3, fistEquivalent: 1 },
  { id: 'barley-water', name: 'Barley Water with Lemon', category: 'Drinks', servingDesc: '1 cup', calories: 90, protein: 0, carbs: 22, fat: 0, fistEquivalent: 1 },
  { id: 'soya-milk', name: 'Soya Bean Milk (unsweetened)', category: 'Drinks', servingDesc: '1 cup', calories: 80, protein: 6, carbs: 8, fat: 3, fistEquivalent: 1 },

  // Desserts
  { id: 'chendol', name: 'Chendol', category: 'Desserts', servingDesc: '1 bowl', calories: 350, protein: 3, carbs: 55, fat: 14, fistEquivalent: 1 },
  { id: 'ice-kacang', name: 'Ice Kacang', category: 'Desserts', servingDesc: '1 bowl', calories: 300, protein: 4, carbs: 60, fat: 6, fistEquivalent: 1.5 },
  { id: 'kueh-lapis', name: 'Kueh Lapis', category: 'Desserts', servingDesc: '2 pieces', calories: 180, protein: 2, carbs: 30, fat: 6, fistEquivalent: 0.5 },
  { id: 'ondeh-ondeh', name: 'Ondeh-Ondeh', category: 'Desserts', servingDesc: '5 pieces', calories: 200, protein: 2, carbs: 35, fat: 8, fistEquivalent: 0.5 },
  { id: 'pulut-hitam', name: 'Pulut Hitam', category: 'Desserts', servingDesc: '1 bowl', calories: 250, protein: 5, carbs: 45, fat: 6, fistEquivalent: 1 },
  { id: 'bubur-cha-cha', name: 'Bubur Cha Cha', category: 'Desserts', servingDesc: '1 bowl', calories: 280, protein: 3, carbs: 45, fat: 10, fistEquivalent: 1 },

  // Western (hawker centre "Western food" stall)
  { id: 'chicken-chop', name: 'Chicken Chop with Fries & Coleslaw', category: 'Western', servingDesc: '1 plate', calories: 750, protein: 40, carbs: 60, fat: 35, fistEquivalent: 2.5 },
  { id: 'fish-and-chips', name: 'Fish & Chips', category: 'Western', servingDesc: '1 plate', calories: 800, protein: 30, carbs: 70, fat: 40, fistEquivalent: 2.5 },
  { id: 'pork-chop-fries', name: 'Pork Chop with Fries', category: 'Western', servingDesc: '1 plate', calories: 700, protein: 35, carbs: 55, fat: 32, fistEquivalent: 2.5 },
  { id: 'baked-rice-chicken', name: 'Baked Cheese Chicken Rice', category: 'Western', servingDesc: '1 plate', calories: 650, protein: 25, carbs: 75, fat: 25, fistEquivalent: 2 },
  { id: 'spaghetti-bolognese', name: 'Spaghetti Bolognese', category: 'Western', servingDesc: '1 plate', calories: 600, protein: 25, carbs: 75, fat: 18, fistEquivalent: 2 },
  { id: 'carbonara', name: 'Carbonara', category: 'Western', servingDesc: '1 plate', calories: 700, protein: 22, carbs: 70, fat: 32, fistEquivalent: 2 },
  { id: 'grilled-chicken-chop', name: 'Grilled Chicken Chop', category: 'Western', servingDesc: '1 plate', calories: 550, protein: 42, carbs: 40, fat: 22, fistEquivalent: 2 },
  { id: 'western-fried-chicken', name: 'Fried Chicken with Fries', category: 'Western', servingDesc: '1 plate', calories: 750, protein: 35, carbs: 60, fat: 38, fistEquivalent: 2.5 },
  { id: 'lamb-chop-fries', name: 'Lamb Chop with Fries', category: 'Western', servingDesc: '1 plate', calories: 750, protein: 38, carbs: 50, fat: 40, fistEquivalent: 2.5 },
  { id: 'hamburger-steak', name: 'Hamburger Steak with Rice', category: 'Western', servingDesc: '1 plate', calories: 650, protein: 30, carbs: 55, fat: 30, fistEquivalent: 2 },

  // Japanese (hawker centre / food court Japanese stall)
  { id: 'chicken-katsu-don', name: 'Chicken Katsu Don', category: 'Japanese', servingDesc: '1 bowl', calories: 650, protein: 28, carbs: 85, fat: 22, fistEquivalent: 2 },
  { id: 'salmon-don', name: 'Salmon Sashimi Don', category: 'Japanese', servingDesc: '1 bowl', calories: 500, protein: 30, carbs: 65, fat: 14, fistEquivalent: 2 },
  { id: 'chirashi-don', name: 'Chirashi Don (assorted sashimi)', category: 'Japanese', servingDesc: '1 bowl', calories: 550, protein: 32, carbs: 65, fat: 16, fistEquivalent: 2 },
  { id: 'teriyaki-chicken-don', name: 'Teriyaki Chicken Don', category: 'Japanese', servingDesc: '1 bowl', calories: 600, protein: 30, carbs: 80, fat: 16, fistEquivalent: 2 },
  { id: 'tonkotsu-ramen', name: 'Tonkotsu Ramen', category: 'Japanese', servingDesc: '1 bowl', calories: 600, protein: 25, carbs: 65, fat: 25, fistEquivalent: 2 },
  { id: 'shoyu-ramen', name: 'Shoyu Ramen', category: 'Japanese', servingDesc: '1 bowl', calories: 500, protein: 22, carbs: 60, fat: 18, fistEquivalent: 2 },
  { id: 'tempura-udon', name: 'Tempura Udon', category: 'Japanese', servingDesc: '1 bowl', calories: 550, protein: 18, carbs: 75, fat: 18, fistEquivalent: 2 },
  { id: 'chicken-karaage', name: 'Chicken Karaage', category: 'Japanese', servingDesc: '6 pieces', calories: 400, protein: 25, carbs: 25, fat: 22, fistEquivalent: 1 },
  { id: 'assorted-sushi', name: 'Assorted Sushi', category: 'Japanese', servingDesc: '8 pieces', calories: 400, protein: 15, carbs: 65, fat: 8, fistEquivalent: 1.5 },
  { id: 'gyoza', name: 'Gyoza', category: 'Japanese', servingDesc: '6 pieces', calories: 300, protein: 12, carbs: 30, fat: 14, fistEquivalent: 1 },
  { id: 'tonkatsu-set', name: 'Tonkatsu Rice Set', category: 'Japanese', servingDesc: '1 set', calories: 700, protein: 30, carbs: 80, fat: 28, fistEquivalent: 2.5 },
  { id: 'yakisoba', name: 'Yakisoba', category: 'Japanese', servingDesc: '1 plate', calories: 550, protein: 18, carbs: 70, fat: 20, fistEquivalent: 2 },

  // Bakery & Pastries
  { id: 'sausage-bun', name: 'Sausage Bun', category: 'Bakery & Pastries', servingDesc: '1 piece', calories: 320, protein: 12, carbs: 35, fat: 14, fistEquivalent: 1 },
  { id: 'egg-tart', name: 'Egg Tart', category: 'Bakery & Pastries', servingDesc: '1 piece', calories: 200, protein: 4, carbs: 18, fat: 13, fistEquivalent: 0.5 },
  { id: 'pineapple-bun', name: 'Pineapple Bun (Bolo Bao)', category: 'Bakery & Pastries', servingDesc: '1 piece', calories: 350, protein: 7, carbs: 50, fat: 13, fistEquivalent: 1 },
  { id: 'chicken-floss-bun', name: 'Chicken Floss Bun', category: 'Bakery & Pastries', servingDesc: '1 piece', calories: 280, protein: 10, carbs: 35, fat: 11, fistEquivalent: 1 },
  { id: 'custard-bun', name: 'Custard Bun (Liu Sha Bao)', category: 'Bakery & Pastries', servingDesc: '1 piece', calories: 220, protein: 5, carbs: 30, fat: 9, fistEquivalent: 1 },
  { id: 'red-bean-bun', name: 'Red Bean Bun', category: 'Bakery & Pastries', servingDesc: '1 piece', calories: 250, protein: 6, carbs: 42, fat: 6, fistEquivalent: 1 },
  { id: 'coconut-bun', name: 'Coconut Bun (Cocktail Bun)', category: 'Bakery & Pastries', servingDesc: '1 piece', calories: 280, protein: 6, carbs: 38, fat: 12, fistEquivalent: 1 },
  { id: 'chocolate-bun', name: 'Chocolate Bun', category: 'Bakery & Pastries', servingDesc: '1 piece', calories: 320, protein: 7, carbs: 42, fat: 14, fistEquivalent: 1 },
  { id: 'cream-bun', name: 'Fresh Cream Bun', category: 'Bakery & Pastries', servingDesc: '1 piece', calories: 300, protein: 6, carbs: 35, fat: 15, fistEquivalent: 1 },
  { id: 'curry-chicken-bun', name: 'Curry Chicken Bun', category: 'Bakery & Pastries', servingDesc: '1 piece', calories: 300, protein: 10, carbs: 35, fat: 12, fistEquivalent: 1 },
  { id: 'butter-bun', name: 'Butter Bun', category: 'Bakery & Pastries', servingDesc: '1 piece', calories: 200, protein: 5, carbs: 30, fat: 6, fistEquivalent: 1 },
  { id: 'kaya-butter-bun', name: 'Kaya Butter Bun', category: 'Bakery & Pastries', servingDesc: '1 piece', calories: 280, protein: 5, carbs: 38, fat: 11, fistEquivalent: 1 },
]

export const FOOD_CATEGORIES = Array.from(new Set(FOODS.map((f) => f.category)))
