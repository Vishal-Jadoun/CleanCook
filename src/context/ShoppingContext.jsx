import React, { useState, useEffect } from 'react';
import dummyShoppingList from '../data/shoppingList';
import { aggregateWeeklyIngredients } from '../utils/groceryAggregator';
import { ShoppingContext } from './shoppingContextInstance';

// Transform initial dummy list into a flat list of interactive items
const buildInitialItems = () => {
  const saved = localStorage.getItem('cleancook_shopping_items');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // fallback
    }
  }

  const items = [];
  let idCounter = 1;
  const emojiMap = {
    Proteins: '🥩',
    Vegetables: '🥦',
    Pantry: '🍚',
    Dairy: '🥛',
    Fruits: '🍎',
    Produce: '🥗',
    Frozen: '🧊',
    Snacks: '🍿',
    Beverages: '🧃'
  };

  dummyShoppingList.forEach((group) => {
    group.items.forEach((item) => {
      items.push({
        id: item.id || `item-${idCounter++}`,
        name: item.name,
        category: group.category || 'Pantry',
        price: parseFloat((Math.random() * 5 + 2).toFixed(2)),
        qty: parseInt(item.quantity) || 1,
        purchased: Boolean(item.checked),
        image: emojiMap[group.category] || '🛒',
        store: 'Local Market'
      });
    });
  });

  return items;
};

export const ShoppingProvider = ({ children }) => {
  const [items, setItems] = useState(buildInitialItems);
  const [toast, setToast] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('cleancook_shopping_items', JSON.stringify(items));
  }, [items]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const hideToast = () => setToast(null);

  // CRUD: Create
  const addItem = ({ name, category = 'Produce', price = 2.99, qty = 1, store = 'FreshMart' }) => {
    const newItem = {
      id: `item-${Date.now()}`,
      name: name.trim(),
      category,
      price: parseFloat(price) || 1.99,
      qty: Math.max(1, parseInt(qty, 10) || 1),
      purchased: false,
      image: getCategoryEmoji(category),
      store
    };
    setItems((prev) => [newItem, ...prev]);
    showToast(`Added "${newItem.name}" to shopping cart!`);
  };

  // Add multiple ingredients exported from Planner
  const addIngredientsToCart = (ingredients = [], mealName = 'Meal') => {
    if (!ingredients.length) return;

    const newItems = ingredients.map((ing, idx) => ({
      id: `plan-ing-${Date.now()}-${idx}`,
      name: ing.item || ing.name || 'Ingredient',
      category: 'Produce',
      price: 2.50,
      qty: 1,
      purchased: false,
      image: '🥗',
      store: 'Meal Plan Export'
    }));

    setItems((prev) => [...newItems, ...prev]);
    showToast(`Exported ${newItems.length} ingredients from "${mealName}" to Shopping Cart!`);
  };

  // Auto-aggregate and sync all ingredients from Planner (Task HAR-P14 & Milestone 3)
  const syncWithPlanner = (weeklyPlan) => {
    const aggregated = aggregateWeeklyIngredients(weeklyPlan);
    if (!aggregated.length) {
      showToast('No planned meals with ingredients found in weekly planner.', 'info');
      return 0;
    }

    setItems((prev) => {
      // Remove previously aggregated items to avoid duplicates on re-sync, then prepend new ones
      const nonPlanItems = prev.filter((i) => !i.id.startsWith('plan-agg-'));
      return [...aggregated, ...nonPlanItems];
    });

    showToast(`Synced ${aggregated.length} grocery items from Weekly Planner!`);
    return aggregated.length;
  };

  // CRUD: Update Quantity
  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextQty = Math.max(1, item.qty + delta);
          return { ...item, qty: nextQty };
        }
        return item;
      })
    );
  };

  // CRUD: Toggle Purchased
  const togglePurchased = (id) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedStatus = !item.purchased;
          showToast(
            updatedStatus ? `Marked "${item.name}" as purchased!` : `Moved "${item.name}" back to cart.`
          );
          return { ...item, purchased: updatedStatus };
        }
        return item;
      })
    );
  };

  // CRUD: Delete
  const deleteItem = (id) => {
    const target = items.find((i) => i.id === id);
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (target) {
      showToast(`Removed "${target.name}" from shopping cart.`, 'info');
    }
  };

  // Bulk: Clear Purchased
  const clearPurchased = () => {
    const count = items.filter((i) => i.purchased).length;
    if (count === 0) {
      showToast('No purchased items to clear.', 'info');
      return;
    }
    setItems((prev) => prev.filter((i) => !i.purchased));
    showToast(`Cleared ${count} purchased item${count > 1 ? 's' : ''}!`);
  };

  // Derived State
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const activeItemsCount = items.filter((i) => !i.purchased).length;

  return (
    <ShoppingContext.Provider
      value={{
        items,
        totalPrice,
        activeItemsCount,
        addItem,
        addIngredientsToCart,
        syncWithPlanner,
        updateQty,
        togglePurchased,
        deleteItem,
        clearPurchased,
        toast,
        showToast,
        hideToast
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

function getCategoryEmoji(cat) {
  const map = {
    Produce: '🥗',
    Dairy: '🧀',
    Meat: '🥩',
    Pantry: '🌾',
    Frozen: '🧊',
    Snacks: '🥨',
    Beverages: '🥤',
    Sweets: '🍰'
  };
  return map[cat] || '🛒';
}
