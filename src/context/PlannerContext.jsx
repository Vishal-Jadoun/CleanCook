import React, { useState, useEffect } from 'react';
import { PlannerContext } from './plannerContextInstance';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DEFAULT_PLAN = {
  Monday: {
    meals: {
      breakfast: {
        name: 'Avocado Toast with Poached Egg',
        calories: 380,
        protein: 16,
        fat: 18,
        carbs: 35,
        prepTime: '15 mins',
        tags: ['Healthy', 'Quick', 'Vegetarian'],
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&q=80',
        ingredients: [
          { item: 'Sourdough Bread', amount: '2 slices' },
          { item: 'Avocado', amount: '1 whole' },
          { item: 'Eggs', amount: '2 large' },
          { item: 'Red Pepper Flakes', amount: '1 pinch' }
        ]
      },
      lunch: {
        name: 'Grilled Chicken Caesar Salad',
        calories: 520,
        protein: 42,
        fat: 22,
        carbs: 18,
        prepTime: '20 mins',
        tags: ['High Protein', 'Keto Friendly'],
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&q=80',
        ingredients: [
          { item: 'Chicken Breast', amount: '200g' },
          { item: 'Romaine Lettuce', amount: '2 cups' },
          { item: 'Parmesan Cheese', amount: '30g' },
          { item: 'Caesar Dressing', amount: '2 tbsp' }
        ]
      },
      dinner: {
        name: 'Pan-Seared Salmon & Asparagus',
        calories: 610,
        protein: 46,
        fat: 28,
        carbs: 22,
        prepTime: '25 mins',
        tags: ['Omega-3', 'Dinner', 'Gluten-Free'],
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&q=80',
        ingredients: [
          { item: 'Salmon Fillet', amount: '220g' },
          { item: 'Asparagus', amount: '1 bunch' },
          { item: 'Olive Oil', amount: '1 tbsp' },
          { item: 'Lemon', amount: '1 whole' }
        ]
      }
    }
  },
  Tuesday: {
    meals: {
      breakfast: {
        name: 'Blueberry Oatmeal Bowl',
        calories: 320,
        protein: 12,
        fat: 6,
        carbs: 56,
        prepTime: '10 mins',
        tags: ['Vegan', 'High Fiber'],
        image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500&q=80',
        ingredients: [
          { item: 'Rolled Oats', amount: '1 cup' },
          { item: 'Blueberries', amount: '0.5 cup' },
          { item: 'Almond Milk', amount: '1 cup' },
          { item: 'Chia Seeds', amount: '1 tsp' }
        ]
      },
      lunch: {
        name: 'Quinoa Veggie Harvest Bowl',
        calories: 460,
        protein: 18,
        fat: 14,
        carbs: 64,
        prepTime: '25 mins',
        tags: ['Vegetarian', 'Clean Eating'],
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&q=80',
        ingredients: [
          { item: 'Quinoa', amount: '1 cup cooked' },
          { item: 'Chickpeas', amount: '0.5 cup' },
          { item: 'Baby Spinach', amount: '1 cup' },
          { item: 'Tahini Dressing', amount: '2 tbsp' }
        ]
      }
    }
  },
  Wednesday: { meals: {} },
  Thursday: { meals: {} },
  Friday: { meals: {} },
  Saturday: { meals: {} },
  Sunday: { meals: {} }
};

export const PlannerProvider = ({ children }) => {
  const [weeklyPlan, setWeeklyPlan] = useState(() => {
    const saved = localStorage.getItem('cleancook_weekly_plan');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_PLAN;
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('cleancook_weekly_plan', JSON.stringify(weeklyPlan));
  }, [weeklyPlan]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const hideToast = () => setToast(null);

  // CRUD: Set or update meal in a specific slot
  const setMeal = (day, slotKey, mealData) => {
    const slotNormalized = slotKey.toLowerCase();
    setWeeklyPlan((prev) => {
      const dayData = prev[day] || { meals: {} };
      return {
        ...prev,
        [day]: {
          ...dayData,
          meals: {
            ...dayData.meals,
            [slotNormalized]: mealData
          }
        }
      };
    });
    showToast(`Added "${mealData.name}" to ${day} ${slotKey}!`);
  };

  // CRUD: Delete meal from a slot
  const removeMeal = (day, slotKey) => {
    const slotNormalized = slotKey.toLowerCase();
    setWeeklyPlan((prev) => {
      const dayData = prev[day] || { meals: {} };
      const newMeals = { ...dayData.meals };
      delete newMeals[slotNormalized];
      return {
        ...prev,
        [day]: {
          ...dayData,
          meals: newMeals
        }
      };
    });
    showToast(`Removed ${slotKey} meal for ${day}.`, 'info');
  };

  // CRUD: Clear single day
  const clearDay = (day) => {
    setWeeklyPlan((prev) => ({
      ...prev,
      [day]: { meals: {} }
    }));
    showToast(`Cleared all meals for ${day}.`, 'info');
  };

  // CRUD: Clear full week
  const clearWeek = () => {
    const emptyPlan = {};
    DAYS.forEach((d) => {
      emptyPlan[d] = { meals: {} };
    });
    setWeeklyPlan(emptyPlan);
    showToast('Weekly plan cleared.', 'info');
  };

  // Derived: Calculate nutrients for a given day
  const calculateDayNutrients = (day) => {
    const meals = weeklyPlan[day]?.meals || {};
    let calories = 0;
    let protein = 0;
    let fat = 0;
    let carbs = 0;

    Object.values(meals).forEach((m) => {
      if (m) {
        calories += Number(m.calories) || 0;
        protein += Number(m.protein) || 0;
        fat += Number(m.fat) || 0;
        carbs += Number(m.carbs) || 0;
      }
    });

    return { calories, protein, fat, carbs };
  };

  // Derived: Weekly metrics
  const getWeeklyMetrics = () => {
    let totalMeals = 0;
    let totalCals = 0;
    DAYS.forEach((day) => {
      const meals = weeklyPlan[day]?.meals || {};
      const mealList = Object.values(meals).filter(Boolean);
      totalMeals += mealList.length;
      mealList.forEach((m) => {
        totalCals += Number(m.calories) || 0;
      });
    });

    const avgDailyCals = Math.round(totalCals / 7);
    return { totalMeals, totalCals, avgDailyCals };
  };

  return (
    <PlannerContext.Provider
      value={{
        weeklyPlan,
        days: DAYS,
        setMeal,
        removeMeal,
        clearDay,
        clearWeek,
        calculateDayNutrients,
        getWeeklyMetrics,
        toast,
        showToast,
        hideToast
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
};
