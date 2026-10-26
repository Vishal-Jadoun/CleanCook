
import React, { useState } from 'react';
import './MealCard.css';

const MealCard = ({ meal, onClose, onExportIngredients }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  if (!meal) return null;

  const calories = meal.nutrients?.calories ?? meal.calories ?? 0;
  const protein = meal.nutrients?.protein ?? meal.protein ?? 0;
  const fat = meal.nutrients?.fat ?? meal.fat ?? 0;
  const carbs = meal.nutrients?.carbs ?? meal.carbs ?? 0;
  const tags = meal.tags || ['Balanced', 'Fresh'];
  const ingredients = meal.ingredients || [];
  const prepTime = meal.prepTime || '20 mins';

  return (
    <div className="meal-card-overlay" onClick={onClose}>
      <div className="meal-card-modal" onClick={(e) => e.stopPropagation()}>
        <div className="meal-image-container">
          <button className="back-btn-overlay" onClick={onClose} type="button">
            ←
          </button>

          <img
            src={meal.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80'}
            alt={meal.name}
            className="meal-hero-img"
          />

          <button
            className={`heart-btn-overlay ${isFavorite ? 'active' : ''}`}
            onClick={() => setIsFavorite(!isFavorite)}
            type="button"
            aria-label="Toggle favorite"
          >
            {isFavorite ? '❤' : '♡'}
          </button>
        </div>

        <div className="nutrient-pills">
          <div className="pill kcal">
            <span className="pill-label">Kcal</span>
            <span className="pill-value">{calories}</span>
          </div>
          <div className="pill protein">
            <span className="pill-label">Protein</span>
            <span className="pill-value">{protein}g</span>
          </div>
          <div className="pill fat">
            <span className="pill-label">Fat</span>
            <span className="pill-value">{fat}g</span>
          </div>
          <div className="pill carbs">
            <span className="pill-label">Carbs</span>
            <span className="pill-value">{carbs}g</span>
          </div>
        </div>

        <div className="meal-details">
          <h2>{meal.name}</h2>

          <div className="meal-meta">
            <span>🔥 {calories} Kcal</span>
            <span>⏱ {prepTime}</span>
          </div>

          <div className="tags-container">
            {tags.map((tag, index) => (
              <span key={index} className="meal-tag">{tag}</span>
            ))}
          </div>

          <div className="ingredients-section">
            <h3>Ingredients</h3>

            {ingredients.length > 0 ? (
              <ul className="ingredients-list">
                {ingredients.map((ing, index) => (
                  <li key={index}>
                    <span className="ing-name">{ing.item || ing.name}</span>
                    <span className="ing-amount">
                      {ing.amount || ing.measure || '1 serving'}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Standard pantry ingredients required.</p>
            )}
          </div>

          <div className="meal-card-cta-group">
            {onExportIngredients && (
              <button
                className="add-to-cart-cta-btn"
                type="button"
                onClick={() => onExportIngredients(meal)}
              >
                🛒 Add Ingredients to Shopping Cart
              </button>
            )}

            <button className="get-plan-btn" type="button" onClick={onClose}>
              Get Meal Plan
            </button>

            <button className="dismiss-cta-btn" type="button" onClick={onClose}>
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
