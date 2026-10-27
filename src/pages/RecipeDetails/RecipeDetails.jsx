import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePlanner } from '../../hooks/usePlanner';
import dummyRecipes from '../../data/recipes';
import abgcbowl from '../../assets/abgcbowl.png';
import bbgcbowl from '../../assets/bbgcbowl.png';
import cbgcbowl from '../../assets/cbgcbowl.png';
import './RecipeDetails.css';

const BOWL_DETAILS = {
  'bowl-1': {
    id: 'bowl-1',
    name: 'Rainbow Buddha Bowl',
    description: 'A colorful mix of avocado, quinoa, chickpeas, fresh greens, purple cabbage, cherry tomatoes, and roasted sweet potatoes.',
    image: abgcbowl,
    prepTime: '15 Mins',
    servings: '2',
    calories: 450,
    ingredients: [
      { measure: '1 cup', name: 'Quinoa' },
      { measure: '1/2 cup', name: 'Chickpeas' },
      { measure: '1', name: 'Fresh Avocado' },
      { measure: '1 cup', name: 'Purple Cabbage' },
      { measure: '1/2 cup', name: 'Cherry Tomatoes' },
      { measure: '1 cup', name: 'Roasted Sweet Potatoes' },
      { measure: '3 tbsp', name: 'Lemon Tahini Dressing' }
    ],
    instructions: [
      { step: 'Cook the Quinoa', detail: 'Rinse quinoa and boil in 2 cups of water for 15 minutes until fluffy.' },
      { step: 'Prepare the Veggies', detail: 'Chop the avocado, cabbage, and tomatoes. Roast the sweet potatoes until soft.' },
      { step: 'Assemble the Bowl', detail: 'Place the cooked quinoa at the bottom. Arrange all the veggies and chickpeas neatly on top.' },
      { step: 'Dressing', detail: 'Drizzle heavily with lemon tahini dressing and serve immediately.' }
    ]
  },
  'bowl-2': {
    id: 'bowl-2',
    name: 'Hearty Lentil & Sweet Potato Bowl',
    description: 'A warm and comforting bowl of protein-rich lentils, roasted sweet potatoes, spinach, and fresh herbs.',
    image: bbgcbowl,
    prepTime: '25 Mins',
    servings: '2',
    calories: 520,
    ingredients: [
      { measure: '1.5 cups', name: 'Brown Lentils' },
      { measure: '2 medium', name: 'Roasted Sweet Potatoes' },
      { measure: '2 cups', name: 'Baby Spinach' },
      { measure: '2 tbsp', name: 'Olive Oil' },
      { measure: '1 tsp', name: 'Cumin & Paprika' },
      { measure: '2 tbsp', name: 'Lemon Juice' }
    ],
    instructions: [
      { step: 'Cook the Lentils', detail: 'Simmer lentils in vegetable broth for 20 minutes until tender.' },
      { step: 'Roast Potatoes', detail: 'Cube sweet potatoes, toss with olive oil and spices, bake at 200°C for 25 minutes.' },
      { step: 'Wilt the Greens', detail: 'Lightly warm the spinach with a splash of lemon juice.' },
      { step: 'Combine & Serve', detail: 'Layer lentils, sweet potatoes, and spinach in a bowl; garnish with fresh herbs.' }
    ]
  },
  'bowl-3': {
    id: 'bowl-3',
    name: 'Mediterranean Kale Chickpea Bowl',
    description: 'Fresh kale and chickpeas tossed with cucumber, cherry tomatoes, red onion, creamy feta, and herbs.',
    image: cbgcbowl,
    prepTime: '20 Mins',
    servings: '2',
    calories: 480,
    ingredients: [
      { measure: '2 cups', name: 'Chopped Kale' },
      { measure: '1 can', name: 'Chickpeas (rinsed)' },
      { measure: '1 cup', name: 'Diced Cucumber' },
      { measure: '1/2 cup', name: 'Cherry Tomatoes' },
      { measure: '1/4 cup', name: 'Crumbled Feta' },
      { measure: '2 tbsp', name: 'Greek Vinaigrette' }
    ],
    instructions: [
      { step: 'Massage the Kale', detail: 'Toss kale leaves with a pinch of salt and olive oil to soften the texture.' },
      { step: 'Prep Toppings', detail: 'Dice cucumber, halve tomatoes, and drain chickpeas.' },
      { step: 'Assemble', detail: 'Toss kale, chickpeas, cucumbers, and tomatoes with Greek vinaigrette.' },
      { step: 'Garnish', detail: 'Sprinkle creamy crumbled feta on top and serve chilled.' }
    ]
  }
};

function parseInstructions(text) {
  if (!text) return [];
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const match = line.match(/^(\d+\.?\s*)(.*?)$/);
      return {
        step: `Step ${index + 1}`,
        detail: match ? match[2] : line
      };
    });
}

function RecipeDetails() {
  const { id } = useParams();
  const { setMeal } = usePlanner();
  const [added, setAdded] = useState(false);

  // 1. Check custom featured bowls
  let recipe = BOWL_DETAILS[id];

  // 2. Check dummyRecipes dataset
  if (!recipe) {
    const found = dummyRecipes.find((r) => String(r.id) === String(id));
    if (found) {
      recipe = {
        id: found.id,
        name: found.name,
        description: `${found.category || 'Healthy'} • ${found.area || 'Classic'} dish prepared with fresh natural ingredients.`,
        image: found.image,
        prepTime: '25 Mins',
        servings: '2-4 Servings',
        calories: 480,
        ingredients: (found.ingredients || []).map((ing) => ({
          measure: ing.measure || 'To taste',
          name: ing.name
        })),
        instructions: parseInstructions(found.instructions)
      };
    }
  }

  // 3. Fallback to bowl-1
  if (!recipe) {
    recipe = BOWL_DETAILS['bowl-1'];
  }

  const handleAddToPlanner = () => {
    setMeal('Monday', 'lunch', {
      name: recipe.name,
      image: recipe.image,
      calories: recipe.calories || 450,
      protein: 20,
      fat: 14,
      carbs: 45,
      prepTime: recipe.prepTime,
      tags: ['Fresh', 'Wholesome'],
      ingredients: recipe.ingredients.map((ing) => ({
        item: ing.name,
        amount: ing.measure
      }))
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <section className="recipeDetailsPage">
      <div className="detailsNavBack">
        <Link to="/recipes" className="backLink">← Back to Recipes</Link>
      </div>

      <div className="detailsHeader">
        <div className="detailsImage">
          <img src={recipe.image} alt={recipe.name} />
        </div>
        <div className="detailsTitleBox">
          <h1>{recipe.name}</h1>
          <p>{recipe.description}</p>

          <div className="recipeStats">
            <span>🕒 {recipe.prepTime}</span>
            <span>👥 {recipe.servings}</span>
            <span>🔥 {recipe.calories} Calories</span>
          </div>

          <div className="actionRow">
            <button
              type="button"
              className="addPlannerBtn"
              onClick={handleAddToPlanner}
            >
              {added ? '✓ Added to Monday Lunch!' : '+ Add to Planner'}
            </button>
          </div>
        </div>
      </div>

      <div className="detailsContent">
        <div className="ingredientsSection">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx}>
                ✓ {ing.measure} {ing.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="instructionsSection">
          <h2>Instructions</h2>
          <ol>
            {recipe.instructions.map((inst, idx) => (
              <li key={idx}>
                <strong>{inst.step}:</strong> {inst.detail}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default RecipeDetails;
