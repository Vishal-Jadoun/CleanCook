import React from 'react';
import './PlannerSlot.css';

const PlannerSlot = ({ dayName, dayData, onClose }) => {
  return (
    <div className="planner-slot-overlay">
      <div className="planner-slot-modal">
        
        <div className="slot-header">
          <button className="back-btn" onClick={onClose}>&lt;</button>
          <h2>{dayName}'s Plan</h2>
          <div className="spacer"></div>
        </div>

        <div className="daily-meals">
          <h3>Daily meals</h3>
          {['breakfast', 'lunch', 'dinner'].map((mealKey) => {
            const meal = dayData.meals ? dayData.meals[mealKey] : null;
            return (
              <div 
                key={mealKey} 
                className={`meal-list-item ${!meal ? 'empty' : ''}`}
              >
                <div className="meal-icon">
                  {mealKey === 'breakfast' ? '🍞' : mealKey === 'lunch' ? '🥗' : '🍲'}
                </div>
                <div className="meal-info">
                  <h4>{mealKey.charAt(0).toUpperCase() + mealKey.slice(1)}</h4>
                  <p>{meal ? meal.name : `Add ${mealKey}...`}</p>
                </div>
              </div>
            );
          })}
        </div>

        {dayData.totalNutrients && (
          <div className="daily-tracker">
            <div className="tracker-circle">
              <span className="cal-count">{dayData.totalNutrients.calories}</span>
              <span className="cal-label">Kcal</span>
            </div>
            <div className="nutrient-bars">
              <div className="nutrient carbs">Carbs {dayData.totalNutrients.carbs}g</div>
              <div className="nutrient fat">Fat {dayData.totalNutrients.fat}g</div>
              <div className="nutrient protein">Protein {dayData.totalNutrients.protein}g</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PlannerSlot;
