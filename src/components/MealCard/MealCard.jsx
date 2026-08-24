import React from 'react';
import './MealCard.css';

const MealCard = ({ meal, onClose }) => {
  if (!meal) return null;

  return (
    <div className="meal-card-overlay">
      <div className="meal-card-modal">

        {/* Top Image Header */}
        <div className="meal-image-container">
          <button
            className="back-btn-overlay"
            onClick={onClose}
          >
            {"<"}
          </button>

          <img
            src={meal.image}
            alt={meal.name}
            className="meal-hero-img"
          />

        </div>


        <div className="nutrient-pills">

          <div className="pill kcal">
           
            <span className="pill-label">Kcal</span>
            <span className="pill-value">
              {meal.nutrients?.calories ?? 0}
            </span>
          </div>

          <div className="pill protein">
         
            <span className="pill-label">Protein</span>
            <span className="pill-value">
              {meal.nutrients?.protein ?? 0}g
            </span>
          </div>

          <div className="pill fat">
            
            <span className="pill-label">Fat</span>
            <span className="pill-value">
              {meal.nutrients?.fat ?? 0}g
            </span>
          </div>

          <div className="pill carbs">
        
            <span className="pill-label">Carbs</span>
            <span className="pill-value">
              {meal.nutrients?.carbs ?? 0}g
            </span>
          </div>

        </div>


        <div className="meal-details">

          <h2>{meal.name}</h2>

          <div className="meal-meta">
            <span>
               {meal.nutrients?.calories ?? 0} Kcal
            </span>

            <span>
               {meal.prepTime || 'N/A'}
            </span>
          </div>

        </div>


        <div className="ingredients-section">

          <h3>Ingredients</h3>

          {/* <ul className="ingredients-list">
            {Array.isArray(meal.ingredients) &&
              meal.ingredients.map((ing, index) => (
                <li key={index}>
                  <span className="ing-name">
                    {ing.item}
                  </span>

                  <span className="ing-amount">
                    {ing.amount}
                  </span>
                </li>
              ))}
          </ul> */}

        </div>

        <button className="get-plan-btn">
          Get Meal Plan
        </button>

      </div>
    </div>
  );
};

export default MealCard;