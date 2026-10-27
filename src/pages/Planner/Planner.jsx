import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { usePlanner } from '../../hooks/usePlanner';
import { useShopping } from '../../hooks/useShopping';
import { useDebounce } from '../../hooks/useDebounce';
import DayColumn from '../../components/DayColumn/DayColumn';
import PlannerSlot from '../../components/PlannerSlot/PlannerSlot';
import MealCard from '../../components/MealCard/MealCard';
import AddMealModal from '../../components/AddMealModal/AddMealModal';
import MealPicker from '../../components/MealPicker/MealPicker';
import Toast from '../../components/common/Toast';
import dummyRecipes from '../../data/recipes';
import './Planner.css';

const API_CATEGORIES = ['All', 'Chicken', 'Vegetarian', 'Pasta', 'Seafood', 'Dessert'];

/**
 * Planner Page Component (Modules 49-54, 55-60, 61-66, 67-72)
 * Features Weekly Scheduler, Interactive MealPicker Modal, REST API Recipe Explorer (axios + debounce + retry + pagination),
 * and Nutrition Analytics.
 */
const Planner = () => {
  const {
    weeklyPlan,
    days,
    calculateDayNutrients,
    getWeeklyMetrics,
    setMeal,
    clearWeek,
    toast,
    hideToast
  } = usePlanner();

  const { addIngredientsToCart, syncWithPlanner } = useShopping();

  // Local State (Modules 49-54 Global vs Local state)
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [activeTab, setActiveTab] = useState('schedule'); // 'schedule' | 'explore' | 'analytics'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeSlotForModal, setActiveSlotForModal] = useState('lunch');
  const [isMealPickerOpen, setIsMealPickerOpen] = useState(false);
  const [activeSlotForPicker, setActiveSlotForPicker] = useState({ day: 'Monday', mealType: 'breakfast' });
  const [activeMealDetail, setActiveMealDetail] = useState(null);

  // REST API Explorer Async State (Modules 67-72 Axios, Loading, Retry, Error Handling, Debounce, Pagination)
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 400);
  const [selectedApiCategory, setSelectedApiCategory] = useState('All');
  const [apiRecipes, setApiRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  // Quick slot assignment state in API Explorer
  const [apiTargetDay, setApiTargetDay] = useState('Monday');
  const [apiTargetSlot, setApiTargetSlot] = useState('lunch');

  // Fetch REST API using axios (TheMealDB)
  const fetchRecipes = useCallback(async (query, category) => {
    setLoading(true);
    setError(null);
    try {
      let endpoint = '';
      if (query && query.trim()) {
        endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query.trim())}`;
      } else if (category && category !== 'All') {
        endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`;
      } else {
        endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=chicken`;
      }

      const response = await axios.get(endpoint);
      const meals = response.data.meals || [];
      setApiRecipes(meals);
      setVisibleCount(6);
    } catch (err) {
      setError(err.message || 'Failed to load recipes. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'explore') {
      fetchRecipes(debouncedSearch, selectedApiCategory);
    }
  }, [activeTab, debouncedSearch, selectedApiCategory, fetchRecipes]);

  // Transform MealDB item into clean meal object
  const formatApiMeal = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 10; i++) {
      const ing = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ing && ing.trim()) {
        ingredients.push({ item: ing.trim(), amount: measure ? measure.trim() : 'to taste' });
      }
    }

    return {
      name: meal.strMeal,
      calories: Math.floor(Math.random() * 250) + 400,
      protein: Math.floor(Math.random() * 20) + 25,
      carbs: Math.floor(Math.random() * 30) + 35,
      fat: Math.floor(Math.random() * 10) + 12,
      prepTime: '30 mins',
      tags: [meal.strCategory || 'Chef Pick', meal.strArea || 'International'].filter(Boolean),
      image: meal.strMealThumb,
      ingredients: ingredients.length
        ? ingredients
        : [{ item: meal.strMeal, amount: '1 meal' }]
    };
  };

  const handleAddApiRecipe = (meal) => {
    const formatted = formatApiMeal(meal);
    setMeal(apiTargetDay, apiTargetSlot, formatted);
  };

  const handleOpenAddModal = (slotKey = 'lunch') => {
    setActiveSlotForModal(slotKey);
    setIsAddModalOpen(true);
  };

  const handleOpenPicker = (slotKey = 'breakfast') => {
    setActiveSlotForPicker({ day: selectedDay, mealType: slotKey });
    setIsMealPickerOpen(true);
  };

  const handleSelectMealFromPicker = (recipe) => {
    setMeal(activeSlotForPicker.day, activeSlotForPicker.mealType, recipe);
  };

  const currentDayNutrients = calculateDayNutrients(selectedDay);
  const weeklyMetrics = getWeeklyMetrics();

  return (
    <div className="planner-page-wrapper">
      {/* Toast Notification System (Modules 61-66) */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      {/* Top Header */}
      <div className="planner-main-header">
        <div>
          <h1 className="planner-page-title">Smart Meal Planner</h1>
          <p className="planner-page-desc">
            Organize weekly balanced menus, track macronutrients, and export grocery lists.
          </p>
        </div>

        <div className="planner-header-controls">
          <button
            className="secondary-sync-btn"
            onClick={() => syncWithPlanner(weeklyPlan)}
            title="Auto-aggregate all planned ingredients to the shopping cart"
          >
            🛒 Sync Week to Cart
          </button>
          <button className="danger-outline-btn" onClick={clearWeek} title="Reset all planned meals">
            Reset Week
          </button>
          <button className="primary-pill-btn" onClick={() => handleOpenPicker('lunch')}>
            + Choose Recipe
          </button>
        </div>
      </div>

      {/* Navigation Tabs (Modules 61-66 Tabs) */}
      <div className="planner-navigation-tabs">
        <button
          className={`nav-tab-btn ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          📅 Weekly Schedule
        </button>
        <button
          className={`nav-tab-btn ${activeTab === 'explore' ? 'active' : ''}`}
          onClick={() => setActiveTab('explore')}
        >
          🌐 Explore Recipes (REST API)
        </button>
        <button
          className={`nav-tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          📊 Nutrition Overview
        </button>
      </div>

      {/* TAB 1: WEEKLY SCHEDULE */}
      {activeTab === 'schedule' && (
        <div className="tab-schedule-view">
          {/* Day Columns Strip */}
          <div className="days-columns-scroll">
            {days.map((day) => {
              const nutrients = calculateDayNutrients(day);
              const dayMeals = weeklyPlan[day]?.meals || {};
              const mealCount = Object.values(dayMeals).filter(Boolean).length;
              return (
                <DayColumn
                  key={day}
                  dayName={day}
                  onClick={() => setSelectedDay(day)}
                  isActive={selectedDay === day}
                  calories={nutrients.calories}
                  mealCount={mealCount}
                />
              );
            })}
          </div>

          {/* Active Day Planner Slot Card */}
          <div className="active-day-slot-wrapper">
            <PlannerSlot
              dayName={selectedDay}
              dayData={{
                meals: weeklyPlan[selectedDay]?.meals || {},
                totalNutrients: currentDayNutrients
              }}
              onOpenPicker={handleOpenPicker}
              onOpenAddModal={handleOpenAddModal}
              onOpenMealCard={(meal) => setActiveMealDetail(meal)}
              onExportIngredients={(meal) =>
                addIngredientsToCart(meal.ingredients || [], meal.name)
              }
            />
          </div>
        </div>
      )}

      {/* TAB 2: EXPLORE RECIPES (REST API with Axios, Loading, Retry, Pagination, Debounce) */}
      {activeTab === 'explore' && (
        <div className="tab-explore-view">
          <div className="api-search-panel">
            <div className="api-search-input-box">
              <span className="api-search-icon">🔍</span>
              <input
                type="text"
                className="api-input"
                placeholder="Search recipe database (e.g. Pasta, Salmon, Curry, Pie)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-api-search" onClick={() => setSearchQuery('')}>
                  &times;
                </button>
              )}
            </div>

            {/* Quick destination target dropdowns */}
            <div className="api-target-selectors">
              <span className="target-label">Assign to:</span>
              <select
                value={apiTargetDay}
                onChange={(e) => setApiTargetDay(e.target.value)}
                className="api-dropdown"
              >
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <select
                value={apiTargetSlot}
                onChange={(e) => setApiTargetSlot(e.target.value)}
                className="api-dropdown"
              >
                <option value="breakfast">Breakfast 🍞</option>
                <option value="lunch">Lunch 🥗</option>
                <option value="dinner">Dinner 🍲</option>
                <option value="snack">Snack 🍎</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="api-categories-strip">
            {API_CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`api-category-pill ${selectedApiCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedApiCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="api-loading-state">
              <div className="api-spinner"></div>
              <p>Fetching recipes via REST API...</p>
            </div>
          )}

          {/* Error & Retry State */}
          {error && !loading && (
            <div className="api-error-card">
              <span className="error-icon">⚠️</span>
              <h4>Failed to load recipes</h4>
              <p>{error}</p>
              <button
                className="api-retry-btn"
                onClick={() => fetchRecipes(debouncedSearch, selectedApiCategory)}
              >
                ↻ Retry Request
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && apiRecipes.length === 0 && (
            <div className="api-empty-card">
              <span className="empty-icon">🍽️</span>
              <h3>No recipes found</h3>
              <p>Try searching for a different keyword or category.</p>
            </div>
          )}

          {/* Recipes Grid */}
          {!loading && !error && apiRecipes.length > 0 && (
            <>
              <div className="api-recipes-grid">
                {apiRecipes.slice(0, visibleCount).map((recipe) => (
                  <div key={recipe.idMeal} className="api-recipe-card">
                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      className="api-card-img"
                      loading="lazy"
                    />
                    <div className="api-card-content">
                      <span className="api-card-category">
                        {recipe.strCategory || selectedApiCategory}
                      </span>
                      <h4 className="api-card-title">{recipe.strMeal}</h4>

                      <div className="api-card-actions">
                        <button
                          className="api-inspect-btn"
                          onClick={() => setActiveMealDetail(formatApiMeal(recipe))}
                        >
                          👁️ Details
                        </button>
                        <button
                          className="api-add-btn"
                          onClick={() => handleAddApiRecipe(recipe)}
                        >
                          + Add to {apiTargetDay.slice(0, 3)}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination / Load More (Modules 67-72) */}
              {visibleCount < apiRecipes.length && (
                <div className="api-pagination-bar">
                  <button
                    className="api-load-more-btn"
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                  >
                    Load More Recipes ({apiRecipes.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* TAB 3: NUTRITION OVERVIEW / ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="tab-analytics-view">
          <div className="analytics-summary-cards">
            <div className="analytics-metric-box">
              <span className="metric-icon">🍽️</span>
              <span className="metric-number">{weeklyMetrics.totalMeals}</span>
              <span className="metric-name">Total Meals Planned</span>
            </div>

            <div className="analytics-metric-box">
              <span className="metric-icon">🔥</span>
              <span className="metric-number">{weeklyMetrics.avgDailyCals}</span>
              <span className="metric-name">Avg Daily Calories</span>
            </div>

            <div className="analytics-metric-box">
              <span className="metric-icon">⚡</span>
              <span className="metric-number">{weeklyMetrics.totalCals}</span>
              <span className="metric-name">Weekly Total (kcal)</span>
            </div>
          </div>

          <div className="weekly-days-table-card">
            <h3>7-Day Macro Distribution</h3>
            <div className="days-macro-table">
              <div className="table-header-row">
                <span>Day</span>
                <span>Calories</span>
                <span>Protein</span>
                <span>Carbs</span>
                <span>Fat</span>
                <span>Status</span>
              </div>
              {days.map((day) => {
                const nuts = calculateDayNutrients(day);
                const count = Object.values(weeklyPlan[day]?.meals || {}).filter(Boolean).length;
                return (
                  <div key={day} className="table-data-row">
                    <span className="day-cell">{day}</span>
                    <span className="val-cell">{nuts.calories} kcal</span>
                    <span className="val-cell">{nuts.protein}g</span>
                    <span className="val-cell">{nuts.carbs}g</span>
                    <span className="val-cell">{nuts.fat}g</span>
                    <span className="badge-cell">
                      <span className={`status-pill ${count >= 3 ? 'ready' : 'incomplete'}`}>
                        {count}/4 Meals
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Task HAR-P11: Interactive Meal Picker Modal */}
      <MealPicker
        isOpen={isMealPickerOpen}
        slotInfo={activeSlotForPicker}
        recipes={dummyRecipes}
        onSelectMeal={handleSelectMealFromPicker}
        onClose={() => setIsMealPickerOpen(false)}
        onOpenCustomModal={() => handleOpenAddModal(activeSlotForPicker.mealType)}
      />

      {/* Add Custom Meal Modal with Full Validation */}
      <AddMealModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        days={days}
        defaultDay={selectedDay}
        defaultSlot={activeSlotForModal}
        onSave={(day, slot, meal) => setMeal(day, slot, meal)}
      />

      {/* Detail View with MealCard Modal */}
      {activeMealDetail && (
        <MealCard
          meal={activeMealDetail}
          onClose={() => setActiveMealDetail(null)}
          onExportIngredients={(meal) => {
            addIngredientsToCart(meal.ingredients || [], meal.name);
            setActiveMealDetail(null);
          }}
        />
      )}
    </div>
  );
};

export default Planner;
