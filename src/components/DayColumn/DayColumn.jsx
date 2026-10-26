import React from 'react';
import './DayColumn.css';

/**
 * DayColumn Component (Weekly Schedule Navigator)
 * Renders an interactive tab for a single day with nutrition and meal count preview.
 */
const DayColumn = ({ dayName, onClick, isActive, calories = 0, mealCount = 0 }) => {
  const abbr = dayName ? dayName.substring(0, 3) : '';

  return (
    <button
      className={`day-column-btn ${isActive ? 'active' : ''}`}
      onClick={onClick}
      type="button"
      aria-label={`Select ${dayName}`}
    >
      <span className="day-abbr-text">{abbr}</span>
      <span className="day-full-text">{dayName}</span>

      <div className="day-calorie-indicator">
        {calories > 0 ? `${calories} kcal` : 'Rest day'}
      </div>

      <div className="day-dots-container">
        <span className={`meal-indicator-dot ${mealCount >= 1 ? 'filled' : ''}`} title="Breakfast"></span>
        <span className={`meal-indicator-dot ${mealCount >= 2 ? 'filled' : ''}`} title="Lunch"></span>
        <span className={`meal-indicator-dot ${mealCount >= 3 ? 'filled' : ''}`} title="Dinner"></span>
      </div>
    </button>
  );
};

export default DayColumn;
