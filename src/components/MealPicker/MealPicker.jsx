import React, { useState, useMemo, useEffect } from 'react';
import { normalizeRecipeForPlanner } from '../../utils/groceryAggregator';
import dummyRecipes from '../../data/recipes';
import './MealPicker.css';

/**
 * MealPicker Modal Component (Task HAR-P11, Milestone 2)
 * Lead Engineer: Harnoor Kaur (Meal Planner & Smart Shopping Module)
 * 
 * Props:
 * - isOpen: boolean
 * - slotInfo: { day: string, mealType: string }
 * - recipes: Array of recipes (defaults to dummyRecipes)
 * - onSelectMeal: (mealObject) => void
 * - onClose: () => void
 * - onOpenCustomModal: () => void (optional fallback to custom meal builder)
 */
const MealPicker = ({
  isOpen,
  slotInfo = { day: 'Monday', mealType: 'lunch' },
  recipes = dummyRecipes,
  onSelectMeal,
  onClose,
  onOpenCustomModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Extract unique categories
  const categories = useMemo(() => {
    const list = ['All'];
    (recipes || []).forEach((r) => {
      const cat = r.category || 'General';
      if (!list.includes(cat)) list.push(cat);
    });
    return list;
  }, [recipes]);

  // Filter recipes by search query and category
  const filteredRecipes = useMemo(() => {
    return (recipes || []).filter((r) => {
      const matchesSearch =
        (r.name || '').toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        (r.tags || []).some((t) => t.toLowerCase().includes(searchTerm.toLowerCase().trim()));
      const matchesCat = selectedCategory === 'All' || r.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [recipes, searchTerm, selectedCategory]);

  if (!isOpen) return null;

  const handleSelect = (recipe) => {
    const normalized = normalizeRecipeForPlanner(recipe);
    onSelectMeal(normalized);
    onClose();
  };

  const slotCapitalized = slotInfo.mealType
    ? slotInfo.mealType.charAt(0).toUpperCase() + slotInfo.mealType.slice(1)
    : 'Meal';

  return (
    <div className="meal-picker-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="meal-picker-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="meal-picker-header">
          <div>
            <span className="meal-picker-badge">
              {slotInfo.day} • {slotCapitalized}
            </span>
            <h2 className="meal-picker-title">Choose Recipe for {slotCapitalized}</h2>
            <p className="meal-picker-subtitle">
              Browse your recipe catalog or select a curated meal to add to your schedule.
            </p>
          </div>
          <button className="meal-picker-close-btn" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="meal-picker-toolbar">
          <div className="meal-picker-search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="meal-picker-search-input"
              placeholder="Search recipes, tags (e.g. Pasta, Spicy, Chicken)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            {searchTerm && (
              <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
                &times;
              </button>
            )}
          </div>

          {/* Quick link to custom creator */}
          {onOpenCustomModal && (
            <button
              type="button"
              className="open-custom-form-btn"
              onClick={() => {
                onClose();
                onOpenCustomModal();
              }}
              title="Manually enter macros and recipe details"
            >
              ✍️ Enter Custom Meal
            </button>
          )}
        </div>

        {/* Categories Strip */}
        <div className="meal-picker-categories">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recipes Grid */}
        <div className="meal-picker-body">
          {filteredRecipes.length === 0 ? (
            <div className="meal-picker-empty">
              <span className="empty-icon">🥗</span>
              <h3>No matching recipes found</h3>
              <p>Try searching with another keyword or pick a different category.</p>
              {onOpenCustomModal && (
                <button
                  className="empty-action-btn"
                  onClick={() => {
                    onClose();
                    onOpenCustomModal();
                  }}
                >
                  Create Custom "{searchTerm}" Meal
                </button>
              )}
            </div>
          ) : (
            <div className="meal-picker-grid">
              {filteredRecipes.map((recipe) => {
                const norm = normalizeRecipeForPlanner(recipe);
                return (
                  <div
                    key={recipe.id}
                    className="meal-picker-card"
                    onClick={() => handleSelect(recipe)}
                  >
                    <div className="picker-card-img-wrap">
                      <img
                        src={norm.image}
                        alt={norm.name}
                        className="picker-card-img"
                        loading="lazy"
                      />
                      <span className="picker-card-cat">{norm.category}</span>
                      <span className="picker-card-cals">{norm.calories} kcal</span>
                    </div>

                    <div className="picker-card-content">
                      <h4 className="picker-card-title">{norm.name}</h4>

                      <div className="picker-card-meta">
                        <span>⏱️ {norm.prepTime}</span>
                        <span>🥩 {norm.protein}g Pro</span>
                      </div>

                      <div className="picker-card-tags">
                        {(norm.tags || []).slice(0, 2).map((tag, idx) => (
                          <span key={idx} className="picker-tag">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        className="picker-select-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(recipe);
                        }}
                      >
                        + Select for {slotCapitalized}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="meal-picker-footer">
          <span className="recipe-count-hint">
            Showing {filteredRecipes.length} recipe{filteredRecipes.length === 1 ? '' : 's'}
          </span>
          <button type="button" className="picker-cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealPicker;
