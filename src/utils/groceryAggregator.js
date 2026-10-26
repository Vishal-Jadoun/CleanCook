/**
 * groceryAggregator.js
 * CleanCook Phase 2 Utility Engine — Harnoor Kaur
 * 
 * Features:
 * 1. aggregateWeeklyIngredients: Iterates through planned meals in weeklyPlan,
 *    extracts ingredients, merges duplicates, and builds grocery items.
 * 2. getDailyNutrition: Shared contract helper for Addy's User & Health Dashboard.
 * 3. normalizeRecipeForPlanner: Formats any recipe (dummy, API, custom) into
 *    the standard CleanCook recipe data contract with full nutrients and macros.
 */

// Category classifier helper
export const categorizeIngredient = (name = '') => {
  const lower = name.toLowerCase();
  if (/chicken|beef|steak|pork|fish|salmon|shrimp|pancetta|bacon|turkey|meat|tuna/i.test(lower)) {
    return 'Meat';
  }
  if (/milk|cheese|butter|parmesan|mozzarella|yogurt|cream|dairy|egg|eggs/i.test(lower)) {
    return 'Dairy';
  }
  if (/lettuce|tomato|onion|garlic|spinach|basil|asparagus|avocado|lime|lemon|cilantro|ginger|pepper|cucumber|broccoli|carrot|sprout/i.test(lower)) {
    return 'Produce';
  }
  if (/banana|apple|berry|berries|blueberry|strawberry|orange/i.test(lower)) {
    return 'Fruits';
  }
  if (/masala|salt|pepper|spice|curry|cumin|oregano|paprika|cinnamon/i.test(lower)) {
    return 'Spices';
  }
  return 'Pantry';
};

const CATEGORY_EMOJIS = {
  Produce: '🥗',
  Dairy: '🧀',
  Meat: '🥩',
  Pantry: '🌾',
  Fruits: '🍎',
  Spices: '🧂',
  Frozen: '🧊',
  Snacks: '🥨',
  Beverages: '🥤',
  Sweets: '🍰'
};

const CATEGORY_PRICES = {
  Produce: 2.49,
  Dairy: 3.29,
  Meat: 8.99,
  Pantry: 2.99,
  Fruits: 1.99,
  Spices: 1.49,
  Frozen: 4.19,
  Snacks: 2.79,
  Beverages: 2.29,
  Sweets: 3.49
};

/**
 * Task HAR-P14: Auto-aggregates all ingredients from weeklyPlan into a consolidated shopping checklist.
 * Merges duplicate ingredient names, tracks quantities, and computes estimated prices.
 */
export function aggregateWeeklyIngredients(weeklyPlan = {}) {
  const aggregatedMap = new Map();

  // Iterate across all days and meal slots
  Object.keys(weeklyPlan).forEach((dayKey) => {
    const dayData = weeklyPlan[dayKey];
    const meals = dayData?.meals || {};

    Object.values(meals).forEach((meal) => {
      if (!meal || !Array.isArray(meal.ingredients)) return;

      meal.ingredients.forEach((ing) => {
        const rawName = ing.name || ing.item || (typeof ing === 'string' ? ing : '');
        if (!rawName || !rawName.trim()) return;

        const cleanName = rawName.trim();
        const lowerKey = cleanName.toLowerCase();
        const measure = ing.measure || ing.amount || '1 portion';
        const category = ing.category || categorizeIngredient(cleanName);

        if (aggregatedMap.has(lowerKey)) {
          const existing = aggregatedMap.get(lowerKey);
          existing.qty += 1;
          if (measure && !existing.sources.includes(meal.name)) {
            existing.sources.push(meal.name);
          }
        } else {
          aggregatedMap.set(lowerKey, {
            id: `plan-agg-${lowerKey.replace(/\s+/g, '-')}-${Date.now().toString(36)}`,
            name: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
            category,
            price: CATEGORY_PRICES[category] || 2.49,
            qty: 1,
            measure,
            purchased: false,
            image: CATEGORY_EMOJIS[category] || '🛒',
            store: 'Supermarket Aisle',
            sources: meal.name ? [meal.name] : []
          });
        }
      });
    });
  });

  return Array.from(aggregatedMap.values());
}

/**
 * Section 5.2: Shared Data Contract with Addy (User & Health Module)
 * Dynamic selector function for computing active day's aggregate macros.
 */
export function getDailyNutrition(weeklyPlan = {}, dayName = 'Monday') {
  const normalizedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1).toLowerCase();
  const dayMeals = weeklyPlan[normalizedDay]?.meals || weeklyPlan[dayName.toLowerCase()]?.meals || {};
  const activeMeals = Object.values(dayMeals).filter(Boolean);

  return activeMeals.reduce(
    (acc, meal) => {
      const cals = Number(meal.nutrients?.calories ?? meal.calories) || 0;
      const pro = Number(meal.nutrients?.protein ?? meal.protein) || 0;
      const carb = Number(meal.nutrients?.carbs ?? meal.carbs) || 0;
      const fat = Number(meal.nutrients?.fat ?? meal.fat) || 0;

      return {
        calories: acc.calories + cals,
        protein: acc.protein + pro,
        carbs: acc.carbs + carb,
        fat: acc.fat + fat
      };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

/**
 * Normalizes any recipe into the Section 5.1 interface:
 * { id, name, category, image, nutrients: { calories, protein, carbs, fat }, prepTime, tags, ingredients }
 */
export function normalizeRecipeForPlanner(recipe = {}) {
  if (!recipe) return null;

  const defaultNutrientsMap = {
    "1": { calories: 520, protein: 38, carbs: 24, fat: 28 }, // Butter Chicken
    "2": { calories: 340, protein: 14, carbs: 18, fat: 22 }, // Caesar Salad
    "3": { calories: 580, protein: 26, carbs: 65, fat: 24 }, // Pasta Carbonara
    "4": { calories: 490, protein: 28, carbs: 58, fat: 16 }, // Pad Thai
    "5": { calories: 650, protein: 24, carbs: 80, fat: 26 }, // Margherita Pizza
    "6": { calories: 620, protein: 40, carbs: 70, fat: 20 }, // Chicken Biryani
  };

  const recipeId = String(recipe.id || recipe.idMeal || Date.now());
  const nut = recipe.nutrients || defaultNutrientsMap[recipeId] || {
    calories: Number(recipe.calories) || 450,
    protein: Number(recipe.protein) || 28,
    carbs: Number(recipe.carbs) || 45,
    fat: Number(recipe.fat) || 16,
  };

  const ingredients = (recipe.ingredients || []).map((ing) => {
    if (typeof ing === 'string') {
      const cat = categorizeIngredient(ing);
      return { name: ing, item: ing, measure: '1 portion', amount: '1 portion', category: cat };
    }
    const name = ing.name || ing.item || 'Ingredient';
    const measure = ing.measure || ing.amount || 'to taste';
    const cat = ing.category || categorizeIngredient(name);
    return { name, item: name, measure, amount: measure, category: cat };
  });

  return {
    id: recipeId,
    name: recipe.name || recipe.strMeal || 'Custom Recipe',
    category: recipe.category || recipe.strCategory || 'General',
    image: recipe.image || recipe.strMealThumb || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80',
    prepTime: recipe.prepTime || '25 Mins',
    tags: Array.isArray(recipe.tags) && recipe.tags.length ? recipe.tags : ['Healthy', 'CleanCook'],
    calories: nut.calories,
    protein: nut.protein,
    carbs: nut.carbs,
    fat: nut.fat,
    nutrients: nut,
    ingredients
  };
}
