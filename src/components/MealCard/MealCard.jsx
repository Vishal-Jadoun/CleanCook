
import React from 'react';
import './MealCard.css';

const MealCard = ({ meal, onClose }) => {
  if (!meal) return null;

  return (
    <div className="meal-card-overlay">
      <div className="meal-card-modal">
        
        {/* Top Image Header */}
        <div className="meal-image-container">
          <button className="back-btn-overlay" onClick={onClose}>&lt;</button>
          <img src={meal.image} alt={meal.name} className="meal-hero-img" />
          <button className="heart-btn-overlay">♡</button>
        </div>

        {/* Nutrient Pills */}
        <div className="nutrient-pills">
          <div className="pill kcal">
            <div className="pill-circle"></div>
            <span className="pill-label">Kcal</span>
            <span className="pill-value">{meal.nutrients.calories}</span>
          </div>
          <div className="pill protein">
            <div className="pill-circle"></div>
            <span className="pill-label">Protein</span>
            <span className="pill-value">{meal.nutrients.protein}g</span>
          </div>
          <div className="pill fat">
            <div className="pill-circle"></div>
            <span className="pill-label">Fat</span>
            <span className="pill-value">{meal.nutrients.fat}g</span>
          </div>
          <div className="pill carbs">
            <div className="pill-circle"></div>
            <span className="pill-label">Carbs</span>
            <span className="pill-value">{meal.nutrients.carbs}g</span>
          </div>
        </div>

        {/* Title and Tags */}
        <div className="meal-details">
          <h2>{meal.name}</h2>
          <div className="meal-meta">
            <span>🔥 {meal.nutrients.calories} Kcal</span>
            <span>⏱️ {meal.prepTime}</span>
          </div>
          <div className="tags-container">
            {meal.tags.map((tag, index) => (
              <span key={index} className="meal-tag">{tag}</span>
            ))}
          </div>
        </div>

        {/* Ingredients List */}
        <div className="ingredients-section">
          <h3>Ingredients</h3>
          <ul className="ingredients-list">
            {meal.ingredients.map((ing, index) => (
              <li key={index}>
                <span className="ing-name">{ing.item}</span>
                <span className="ing-amount">{ing.amount}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Action Button */}
        <button className="get-plan-btn">Get Meal Plan</button>

      </div>
    </div>
  );
};

export default MealCard;
import './MealCard.css';
function MealCard({meal}){
    return (
        <div className="meals">
            <span>{meal}</span>
        </div>
    );
}

export default MealCard;
