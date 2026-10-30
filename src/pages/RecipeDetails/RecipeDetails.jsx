import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMealById, extractIngredients } from '../../services/mealDbService';
import { usePlanner } from '../../context/PlannerContext';
import { SIGNATURE_BOWLS } from '../../data/signatureBowls';
import localRecipes from '../../data/recipes';
import './RecipeDetails.css';

const DUMMYJSON_URL = 'https://dummyjson.com/recipes';

function RecipeDetails() {
  const { id } = useParams();
  const { setMeal, days } = usePlanner();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToPlanner, setAddedToPlanner] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedSlot, setSelectedSlot] = useState('lunch');

  useEffect(() => {
    let cancelled = false;

    async function loadRecipe() {
      setLoading(true);
      setError(null);

      const signatureMatch = SIGNATURE_BOWLS.find(
        (b) => b.id === id || b.aliasIds?.includes(String(id))
      );
      if (signatureMatch) {
        if (!cancelled) {
          setRecipe({
            source: 'signature',
            name: signatureMatch.name,
            image: signatureMatch.image,
            area: signatureMatch.area || 'Healthy Bowl',
            category: signatureMatch.category || 'Signature Bowl',
            tags: signatureMatch.tags || [],
            ingredients: signatureMatch.ingredients || [],
            instructions: signatureMatch.instructions || '',
          });
          setLoading(false);
        }
        return;
      }

      const localMatch = localRecipes.find((r) => String(r.id) === String(id));
      if (localMatch) {
        if (!cancelled) {
          setRecipe({
            source: 'local',
            name: localMatch.name,
            image: localMatch.image,
            area: localMatch.area || '',
            category: localMatch.category || '',
            tags: localMatch.tags || [],
            ingredients: localMatch.ingredients || [],
            instructions: localMatch.instructions || '',
          });
          setLoading(false);
        }
        return;
      }

      try {
        const meal = await getMealById(id);
        if (meal) {
          if (!cancelled) {
            setRecipe({
              source: 'api',
              name: meal.strMeal,
              image: meal.strMealThumb,
              area: meal.strArea || '',
              category: meal.strCategory || '',
              tags: meal.strTags ? meal.strTags.split(',').map((t) => t.trim()) : [],
              ingredients: extractIngredients(meal),
              instructions: meal.strInstructions || '',
              youtube: meal.strYoutube || '',
            });
            setLoading(false);
          }
          return;
        }

        const numericId = Number(id);
        if (numericId > 0 && numericId < 1000) {
          const res = await fetch(`${DUMMYJSON_URL}/${id}`);
          if (res.ok) {
            const dj = await res.json();
            if (!cancelled) {
              setRecipe({
                source: 'dummyjson',
                name: dj.name,
                image: dj.image,
                area: dj.cuisine || '',
                category: dj.difficulty || '',
                tags: dj.tags || [],
                ingredients: (dj.ingredients || []).map((ing) => ({ name: ing, measure: '' })),
                instructions: (dj.instructions || []).join('\n'),
              });
              setLoading(false);
            }
            return;
          }
        }

        if (cancelled) return;
        setError('Recipe not found');
        setLoading(false);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to load recipe');
          setLoading(false);
        }
      }
    }

    loadRecipe();
    return () => {
      cancelled = true;
    };
  }, [id]);

  function handleAddToPlanner() {
    if (!recipe) return;

    const plannerMeal = {
      name: recipe.name,
      image: recipe.image,
      calories: Math.floor(Math.random() * 300) + 350,
      protein: Math.floor(Math.random() * 20) + 20,
      carbs: Math.floor(Math.random() * 30) + 30,
      fat: Math.floor(Math.random() * 15) + 10,
      prepTime: '30 mins',
      tags: recipe.tags,
      ingredients: recipe.ingredients.map((ing) => ({
        item: ing.name,
        amount: ing.measure || '1 portion',
      })),
    };

    setMeal(selectedDay, selectedSlot, plannerMeal);
    setAddedToPlanner(true);
    setTimeout(() => setAddedToPlanner(false), 3000);
  }

  function formatInstructions(text) {
    if (!text) return [];
    return text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }

  if (loading) {
    return (
      <section className="recipeDetailsPage">
        <div className="details-state-wrap">
          <div className="details-loader">
            <div className="details-spinner" />
            <p>Loading recipe...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !recipe) {
    return (
      <section className="recipeDetailsPage">
        <div className="details-state-wrap">
          <div className="details-error">
            <span className="details-error-icon">⚠️</span>
            <p>{error || 'Recipe not found'}</p>
            <Link to="/recipes" className="details-back-btn">Browse Recipes</Link>
          </div>
        </div>
      </section>
    );
  }

  const steps = formatInstructions(recipe.instructions);

  return (
    <section className="recipeDetailsPage">
      <Link to="/recipes" className="details-breadcrumb">← Back to Recipes</Link>

      <div className="detailsHeader">
        <div className="detailsImage">
          <img src={recipe.image} alt={recipe.name} />
        </div>
        <div className="detailsTitleBox">
          <h1>{recipe.name}</h1>

          <div className="recipeStats">
            {recipe.area && <span>🌍 {recipe.area}</span>}
            {recipe.category && <span>📂 {recipe.category}</span>}
            {recipe.ingredients.length > 0 && (
              <span>🥘 {recipe.ingredients.length} Ingredients</span>
            )}
          </div>

          {recipe.tags.length > 0 && (
            <div className="details-tags">
              {recipe.tags.map((tag) => (
                <span key={tag} className="details-tag">#{tag}</span>
              ))}
            </div>
          )}

          <div className="details-planner-controls">
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="details-select"
            >
              {days.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <select
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              className="details-select"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
            <button className="addPlannerBtn" onClick={handleAddToPlanner}>
              {addedToPlanner ? '✓ Added!' : '+ Add to Planner'}
            </button>
          </div>
        </div>
      </div>

      <div className="detailsContent">
        <div className="ingredientsSection">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ing, index) => (
              <li key={index}>
                <span className="ingredient-name">{ing.name}</span>
                {ing.measure && <span className="ingredient-measure">{ing.measure}</span>}
              </li>
            ))}
          </ul>
        </div>

        <div className="instructionsSection">
          <h2>Instructions</h2>
          <ol>
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>

          {recipe.youtube && (
            <a
              href={recipe.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="details-youtube-link"
            >
              ▶ Watch Video Tutorial
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default RecipeDetails;
