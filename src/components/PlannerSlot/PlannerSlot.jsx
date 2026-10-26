
import React, { useState } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import MealCard from '../MealCard/MealCard';
import './PlannerSlot.css';

const SLOTS = [
  { key: 'breakfast', label: 'Breakfast', icon: '🍞' },
  { key: 'lunch', label: 'Lunch', icon: '🥗' },
  { key: 'dinner', label: 'Dinner', icon: '🍲' },
  { key: 'snack', label: 'Snack', icon: '🍎' }
];

const PlannerSlot = ({
  dayName,
  dayData,
  onClose,
  onOpenPicker,
  onOpenAddModal,
  onOpenMealCard,
  onExportIngredients
}) => {
  const { setMeal, removeMeal, clearDay } = usePlanner();
  const [selectedMeal, setSelectedMeal] = useState(null);

  const meals = dayData?.meals || {};
  const nutrients = dayData?.totalNutrients || {
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0
  };

  const openMeal = (meal) => {
    if (onOpenMealCard) {
      onOpenMealCard(meal);
    } else {
      setSelectedMeal(meal);
    }
  };

  const handleDragStart = (e, slotKey, meal) => {
    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({ fromSlot: slotKey, meal })
    );
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetSlot) => {
    e.preventDefault();

    try {
      const dataStr = e.dataTransfer.getData('application/json');
      if (!dataStr) return;

      const { fromSlot, meal } = JSON.parse(dataStr);

      if (fromSlot && meal && fromSlot !== targetSlot) {
        setMeal(dayName, targetSlot, meal);
        removeMeal(dayName, fromSlot);
      }
    } catch {
      // Ignore invalid drag data.
    }
  };

  const targetCals = 2000;
  const calPercent = Math.min(
    100,
    Math.round((nutrients.calories / targetCals) * 100)
  );

  return (
    <div className="planner-slot-wrapper">
      <div className="slot-card-header">
        <div>
          <h2 className="slot-day-title">{dayName}'s Menu</h2>
          <p className="slot-day-subtitle">
            Plan meals, reschedule slots, and track daily nutrition.
          </p>
        </div>

        <button
          type="button"
          className="slot-clear-day-btn"
          onClick={() => clearDay(dayName)}
          title={`Clear all meals for ${dayName}`}
        >
          Clear Day
        </button>
      </div>

      <div className="slots-grid-container">
        {SLOTS.map(({ key, label, icon }) => {
          const meal = meals[key];

          return (
            <div
              key={key}
              className={`slot-box ${meal ? 'filled' : 'empty'}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, key)}
            >
              <div className="slot-box-top">
                <span className="slot-type-pill">
                  <span className="slot-icon">{icon}</span> {label}
                </span>

                {meal && (
                  <div className="slot-box-actions">
                    <button
                      type="button"
                      className="slot-action-btn"
                      title="View meal details"
                      onClick={() => openMeal(meal)}
                    >
                      👁
                    </button>

                    {onExportIngredients && (
                      <button
                        type="button"
                        className="slot-action-btn cart"
                        title="Export ingredients to shopping cart"
                        onClick={() => onExportIngredients(meal)}
                      >
                        🛒
                      </button>
                    )}

                    <button
                      type="button"
                      className="slot-action-btn delete"
                      title="Remove meal"
                      onClick={() => removeMeal(dayName, key)}
                    >
                      🗑
                    </button>
                  </div>
                )}
              </div>

              {meal ? (
                <div
                  className="slot-meal-content"
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, key, meal)}
                  onClick={() => openMeal(meal)}
                  title="Drag meal to another slot"
                >
                  {meal.image && (
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="slot-meal-thumb"
                    />
                  )}

                  <div className="slot-meal-info">
                    <h4 className="slot-meal-name">{meal.name}</h4>

                    <div className="slot-macro-tags">
                      <span className="macro-tag cal">
                        🔥 {meal.nutrients?.calories ?? meal.calories ?? 0} kcal
                      </span>
                      <span className="macro-tag pro">
                        P: {meal.nutrients?.protein ?? meal.protein ?? 0}g
                      </span>
                      <span className="macro-tag carb">
                        C: {meal.nutrients?.carbs ?? meal.carbs ?? 0}g
                      </span>
                      <span className="macro-tag fat">
                        F: {meal.nutrients?.fat ?? meal.fat ?? 0}g
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="add-meal-slot-btn"
                  onClick={() => {
                    if (onOpenPicker) {
                      onOpenPicker(key);
                    } else if (onOpenAddModal) {
                      onOpenAddModal(key);
                    }
                  }}
                >
                  <span className="plus-sign">+</span> Plan {label}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="slot-tracker-card">
        <div className="tracker-header">
          <h4 className="tracker-title">Daily Nutrition Tracker</h4>
          <span className="tracker-target-hint">
            {nutrients.calories} / {targetCals} kcal ({calPercent}%)
          </span>
        </div>

        <div className="cal-progress-track">
          <div
            className="cal-progress-fill"
            style={{ width: `${calPercent}%` }}
          />
        </div>

        <div className="macros-breakdown-row">
          <div className="macro-stat-box protein">
            <span className="stat-label">Protein</span>
            <span className="stat-value">{nutrients.protein}g</span>
            <span className="stat-sub">Target: 120g</span>
          </div>

          <div className="macro-stat-box carbs">
            <span className="stat-label">Carbs</span>
            <span className="stat-value">{nutrients.carbs}g</span>
            <span className="stat-sub">Target: 220g</span>
          </div>

          <div className="macro-stat-box fat">
            <span className="stat-label">Fat</span>
            <span className="stat-value">{nutrients.fat}g</span>
            <span className="stat-sub">Target: 65g</span>
          </div>
        </div>
      </div>

      {selectedMeal && (
        <MealCard
          meal={selectedMeal}
          onClose={() => setSelectedMeal(null)}
          onExportIngredients={onExportIngredients}
        />
      )}
    </div>
  );
};

export default PlannerSlot;
