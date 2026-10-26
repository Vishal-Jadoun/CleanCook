import React from 'react';
import './PlannerSlot.css';
import { useState } from 'react';
import MealCard from '../MealCard/MealCard';

const PlannerSlot = ({ dayName, dayData, onClose }) => {
  const [selectedMeal, setSelectedMeal] = useState(null); 
  return (
    <div className="planner-slot-overlay">
      <div className="planner-slot-modal">
        
        <div className="slot-header">
          <button className="back-btn" onClick={onClose}>{"<"}</button>
          <h2>{dayName}'s Plan</h2>
          <div className="spacer"></div>
        </div>

        <div className="daily-meals">
          <h3>Daily meals</h3>
          {['breakfast', 'lunch', 'dinner'].map((mealKey) => {
            const meal = dayData ? dayData[mealKey] : null;
            return (
              <div 
                key={mealKey} 
                className={`meal-list-item ${!meal ? 'empty' : ''}`}
                onClick={() => meal && setSelectedMeal(meal)}
              >

                <div className="meal-info">
                  <h4>{mealKey.charAt(0).toUpperCase() + mealKey.slice(1)}</h4>
                  <p>{meal ? meal.name : `Add ${mealKey}...`}</p>
                </div>
              </div>
            );
          })}
        </div>

           {selectedMeal && (
          <MealCard
            meal={selectedMeal}
            onClose={() => setSelectedMeal(null)}
          />
        )}

      </div>
    </div>
  );
};

export default PlannerSlot;