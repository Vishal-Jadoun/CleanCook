import { Link } from 'react-router-dom';
import './RecipeCard.css';

function getShortDescription(recipe) {
  if (recipe.description) return recipe.description;
  if (recipe.strInstructions) {
    const clean = recipe.strInstructions.replace(/(\r\n|\n|\r)/gm, ' ').trim();
    return clean.length > 105 ? clean.substring(0, 102) + '...' : clean;
  }
  const area = recipe.strArea || recipe.area || 'International';
  const category = recipe.strCategory || recipe.category || 'healthy dish';
  return `A flavorful ${area} ${category.toLowerCase()} recipe prepared with fresh ingredients.`;
}

function getRecipeMeta(recipe) {
  if (recipe.prepTime && recipe.calories) {
    return { prepTime: recipe.prepTime, calories: recipe.calories };
  }
  const idStr = (recipe.idMeal || recipe.id || '42').toString();
  const seed = parseInt(idStr.slice(-2), 10) || 30;
  const mins = 15 + (seed % 20);
  const cals = 380 + (seed % 18) * 10;
  return { prepTime: `${mins} min`, calories: `${cals} cal` };
}

function RecipeCard({ recipe }) {
  if (!recipe) return null;

  const id = recipe.id || recipe.idMeal;
  const name = recipe.name || recipe.strMeal;
  const image = recipe.image || recipe.strMealThumb;
  const tag = recipe.tag || recipe.strCategory || recipe.category || recipe.strArea || 'Chef Pick';
  const desc = getShortDescription(recipe);
  const meta = getRecipeMeta(recipe);
  const route = recipe.route || `/recipe/${id}`;

  return (
    <div className="featured-bowl-card" role="listitem">
      <div className="featured-bowl-img-wrap">
        <img
          src={image}
          alt={name}
          className="featured-bowl-img"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80';
          }}
        />
        <span className="featured-bowl-badge">{tag}</span>
      </div>

      <div className="featured-bowl-body">
        <h3 className="featured-bowl-name">{name}</h3>
        <p className="featured-bowl-desc">{desc}</p>

        <div className="featured-bowl-footer">
          <span className="featured-bowl-meta">
            ⏱️ {meta.prepTime} • 🔥 {meta.calories}
          </span>
          <Link
            to={route}
            className="featured-bowl-btn"
            aria-label={`Cook ${name}`}
          >
            Cook This Meal
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
