const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function searchMeals(query) {
  const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Failed to fetch recipes');
  const data = await response.json();
  return data.meals || [];
}

export async function getMealById(id) {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  if (!response.ok) throw new Error('Failed to fetch recipe details');
  const data = await response.json();
  return data.meals ? data.meals[0] : null;
}

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/categories.php`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  const data = await response.json();
  return data.categories || [];
}

export async function filterByCategory(category) {
  const response = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
  if (!response.ok) throw new Error('Failed to fetch recipes');
  const data = await response.json();
  return data.meals || [];
}

export function extractIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (name && name.trim()) {
      ingredients.push({ name: name.trim(), measure: measure ? measure.trim() : '' });
    }
  }
  return ingredients;
}

