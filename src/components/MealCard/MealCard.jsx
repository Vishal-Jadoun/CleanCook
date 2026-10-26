import React, { useState } from 'react';
import './MealCard.css';

/**
 * MealCard Component (Modules 61-66 Modal, Detail View)
 * Displays deep nutritional breakdown, ingredients, and cart export for a meal.
 */
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
    <div className="meal-card-backdrop" onClick={onClose}>
      <div className="meal-card-modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Top Hero Image Header */}
        <div className="meal-hero-container">
          <button
            className="card-header-btn back"
            onClick={onClose}
            aria-label="Close meal card"
          >
            ←
          </button>

          <img
            src={meal.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80'}
            alt={meal.name}
            className="meal-cover-photo"
          />

          <button
            className={`card-header-btn heart ${isFavorite ? 'active' : ''}`}
            onClick={() => setIsFavorite(!isFavorite)}
            aria-label="Toggle favorite"
          >
            {isFavorite ? '❤️' : '♡'}
          </button>
        </div>

        {/* Floating Nutrient Pills Bar */}
        <div className="nutrient-capsules-row">
          <div className="capsule kcal">
            <span className="capsule-label">Calories</span>
            <span className="capsule-value">{calories}</span>
            <span className="capsule-unit">kcal</span>
          </div>

          <div className="capsule protein">
            <span className="capsule-label">Protein</span>
            <span className="capsule-value">{protein}</span>
            <span className="capsule-unit">g</span>
          </div>

          <div className="capsule fat">
            <span className="capsule-label">Fat</span>
            <span className="capsule-value">{fat}</span>
            <span className="capsule-unit">g</span>
          </div>

          <div className="capsule carbs">
            <span className="capsule-label">Carbs</span>
            <span className="capsule-value">{carbs}</span>
            <span className="capsule-unit">g</span>
          </div>
        </div>

        {/* Meal Details & Meta */}
        <div className="meal-content-body">
          <div className="title-and-prep">
            <h2 className="meal-modal-title">{meal.name}</h2>
            <div className="meal-meta-pills">
              <span className="meta-badge">⏱️ {prepTime}</span>
              <span className="meta-badge">🔥 {calories} kcal</span>
            </div>
          </div>

          <div className="tags-strip">
            {tags.map((tag, idx) => (
              <span key={idx} className="meal-category-tag">
                {tag}
              </span>
            ))}
          </div>

          {/* Ingredients Section */}
          <div className="ingredients-card-section">
            <h3 className="section-heading">Ingredients & Pantry Items</h3>
            {ingredients.length > 0 ? (
              <ul className="ingredients-checklist">
                {ingredients.map((ing, idx) => (
                  <li key={idx} className="ingredient-row">
                    <span className="ingredient-name">{ing.item || ing.name}</span>
                    <span className="ingredient-qty">{ing.amount || ing.measure || '1 serving'}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-ingredients-hint">Standard pantry ingredients required.</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="meal-card-cta-group">
            {onExportIngredients && (
              <button
                className="add-to-cart-cta-btn"
                onClick={() => {
                  onExportIngredients(meal);
                }}
              >
                🛒 Add Ingredients to Shopping Cart
              </button>
            )}
            <button className="dismiss-cta-btn" onClick={onClose}>
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard;