import './FavoritesCard.css';

function FavoritesCard({
  icon = '🥗',
  tag = 'Healthy Lunch',
  title = 'Paneer Avocado Salad',
  description = 'Fresh bowl loaded with grilled paneer, ripe avocado, and zesty lemon dressing.',
  calories = '340',
  time = '15',
  protein = '20g',
}) {
  return (
    <div className="favorites-card">
      {/* Card Top: Image / Icon + Category Tag + Favorite Heart */}
      <div className="fav-image-container">
        <div className="fav-food-icon">{icon}</div>
        <span className="fav-category-tag">{tag}</span>
        <button type="button" className="fav-heart-btn" aria-label="Favorite button">
          ❤️
        </button>
      </div>

      {/* Card Body */}
      <div className="fav-content">
        <h3 className="fav-title">{title}</h3>
        <p className="fav-description">{description}</p>

        {/* Quick Nutrition & Prep Stats */}
        <div className="fav-meta-stats">
          <span className="fav-stat-pill">
            🔥 <strong>{calories}</strong> kcal
          </span>
          <span className="fav-stat-pill">
            ⏱️ <strong>{time}</strong> min
          </span>
          <span className="fav-stat-pill">
            🍗 <strong>{protein}</strong> protein
          </span>
        </div>

        {/* Bottom Actions */}
        <div className="fav-actions">
          <button type="button" className="btn-view-recipe">
            View Recipe
          </button>
          <button type="button" className="btn-add-plan" title="Add to Meal Planner">
            + Plan
          </button>
        </div>
      </div>
    </div>
  );
}

export default FavoritesCard;
