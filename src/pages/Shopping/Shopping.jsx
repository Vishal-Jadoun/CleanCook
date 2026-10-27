import React, { useState, useMemo } from 'react';
import { useShopping } from '../../hooks/useShopping';
import { usePlanner } from '../../hooks/usePlanner';
import { useDebounce } from '../../hooks/useDebounce';
import ShoppingList from '../../components/ShoppingList/ShoppingList';
import AddItemModal from '../../components/AddItemModal/AddItemModal';
import Toast from '../../components/common/Toast';
import './Shopping.css';

const CATEGORIES = [
  'All',
  'Produce',
  'Dairy',
  'Meat',
  'Pantry',
  'Frozen',
  'Snacks',
  'Beverages',
  'Sweets'
];

const RECOMMENDED_ITEMS = [
  { name: 'Organic Bananas', category: 'Produce', price: 1.89, image: '🍌', store: 'FreshCo' },
  { name: 'Greek Yogurt 0%', category: 'Dairy', price: 3.49, image: '🥛', store: 'DairyMart' },
  { name: 'Rolled Oats (1kg)', category: 'Pantry', price: 4.20, image: '🌾', store: 'BulkBarn' },
  { name: 'Grass-fed Beef Steak', category: 'Meat', price: 9.99, image: '🥩', store: 'ButcherCo' },
  { name: 'Dark Chocolate 85%', category: 'Sweets', price: 3.19, image: '🍫', store: 'SweetShop' }
];

/**
 * Shopping Page Component (Modules 49-54 Shopping Cart, 61-66 Search, Filter, Sort Patterns)
 */
const Shopping = () => {
  const { weeklyPlan } = usePlanner();
  const {
    items,
    totalPrice,
    addItem,
    syncWithPlanner,
    updateQty,
    togglePurchased,
    deleteItem,
    clearPurchased,
    toast,
    hideToast,
    showToast
  } = useShopping();

  // Search, Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 350);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pending' | 'purchased'
  const [sortBy, setSortBy] = useState('name-asc'); // 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'qty-desc'
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search, Filter & Sort Logic (Modules 61-66)
  const filteredAndSortedItems = useMemo(() => {
    return items
      .filter((item) => {
        const matchesSearch = item.name
          .toLowerCase()
          .includes(debouncedSearch.trim().toLowerCase());
        const matchesCategory =
          selectedCategory === 'All' || item.category === selectedCategory;
        const matchesStatus =
          statusFilter === 'all'
            ? true
            : statusFilter === 'purchased'
            ? item.purchased
            : !item.purchased;

        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'qty-desc') return b.qty - a.qty;
        return 0;
      });
  }, [items, debouncedSearch, selectedCategory, statusFilter, sortBy]);

  const copyListToClipboard = () => {
    if (!items.length) {
      showToast('No items to copy.', 'info');
      return;
    }
    const text = items
      .map(
        (i) =>
          `[${i.purchased ? 'X' : ' '}] ${i.name} (x${i.qty}) - ₹${(i.price * i.qty).toFixed(2)}`
      )
      .join('\n');
    navigator.clipboard.writeText(text);
    showToast('Shopping list copied to clipboard!');
  };

  const pendingCount = items.filter((i) => !i.purchased).length;
  const purchasedCount = items.filter((i) => i.purchased).length;
  const totalUnits = items.reduce((acc, i) => acc + i.qty, 0);

  return (
    <div className="shopping-page-wrapper">
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      {/* Header Bar */}
      <div className="shopping-page-header">
        <div>
          <h1 className="shopping-title">Smart Grocery Cart</h1>
          <p className="shopping-subtitle">
            Organize ingredients, monitor budget, and sync directly with your meal planner.
          </p>
        </div>

        <div className="shopping-header-actions">
          <button
            className="sync-planner-action-btn"
            onClick={() => syncWithPlanner(weeklyPlan)}
            title="Auto-aggregate ingredients from all meals scheduled in your Weekly Planner"
          >
            ⚡ Auto-Sync from Planner
          </button>
          <button className="secondary-action-btn" onClick={copyListToClipboard}>
            📋 Copy List
          </button>
          <button className="primary-action-btn" onClick={() => setIsModalOpen(true)}>
            + Add Item
          </button>
        </div>
      </div>

      {/* Control Bar: Search, Status Tabs & Sorting Dropdown */}
      <div className="shopping-controls-card">
        <div className="search-input-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="filter-search-input"
            placeholder="Search items by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
              &times;
            </button>
          )}
        </div>

        {/* Status Tabs */}
        <div className="status-toggle-tabs">
          <button
            className={`status-tab ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            All <span className="tab-badge">{items.length}</span>
          </button>
          <button
            className={`status-tab ${statusFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setStatusFilter('pending')}
          >
            To Buy <span className="tab-badge">{pendingCount}</span>
          </button>
          <button
            className={`status-tab ${statusFilter === 'purchased' ? 'active' : ''}`}
            onClick={() => setStatusFilter('purchased')}
          >
            Purchased <span className="tab-badge">{purchasedCount}</span>
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="sort-select-box">
          <label htmlFor="sortSelect" className="sort-label">
            Sort by:
          </label>
          <select
            id="sortSelect"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-dropdown"
          >
            <option value="name-asc">Name (A → Z)</option>
            <option value="name-desc">Name (Z → A)</option>
            <option value="price-asc">Price (Low → High)</option>
            <option value="price-desc">Price (High → Low)</option>
            <option value="qty-desc">Highest Quantity</option>
          </select>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="category-scroll-strip">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid: ShoppingList & Cart Summary */}
      <div className="shopping-main-layout">
        <div className="shopping-list-column">
          <ShoppingList
            items={filteredAndSortedItems}
            totalPrice={totalPrice}
            onTogglePurchased={togglePurchased}
            onUpdateQty={updateQty}
            onDelete={deleteItem}
            onClearPurchased={clearPurchased}
          />

          {/* Quick-add Recommendations */}
          <div className="quick-recommendations-section">
            <h3 className="section-title">Popular Pantry Staples</h3>
            <div className="recommendations-row">
              {RECOMMENDED_ITEMS.map((item, idx) => (
                <div key={idx} className="rec-mini-card">
                  <div className="rec-emoji">{item.image}</div>
                  <div className="rec-info">
                    <span className="rec-name">{item.name}</span>
                    <span className="rec-price">₹{item.price.toFixed(2)}</span>
                  </div>
                  <button
                    className="rec-add-btn"
                    onClick={() => addItem(item)}
                    title={`Add ${item.name} to list`}
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Cart Summary Dashboard */}
        <div className="cart-summary-column">
          <div className="cart-summary-card">
            <h3 className="summary-title">Cart Summary</h3>

            {/* Task HAR-P22: Completion Progress Bar */}
            <div className="cart-progress-box">
              <div className="progress-label-row">
                <span className="progress-label-text">Completion Progress</span>
                <span className="progress-pct-badge">
                  {items.length > 0 ? Math.round((purchasedCount / items.length) * 100) : 0}%
                </span>
              </div>
              <div className="cart-progress-bar-track">
                <div
                  className="cart-progress-bar-fill"
                  style={{
                    width: `${items.length > 0 ? Math.round((purchasedCount / items.length) * 100) : 0}%`
                  }}
                ></div>
              </div>
              <span className="progress-item-ratio">
                {purchasedCount} of {items.length} items checked
              </span>
            </div>

            <div className="summary-row">
              <span className="summary-label">Total Unique Items</span>
              <span className="summary-val">{items.length}</span>
            </div>

            <div className="summary-row">
              <span className="summary-label">Total Units</span>
              <span className="summary-val">{totalUnits} pcs</span>
            </div>

            <div className="summary-row">
              <span className="summary-label">Items Purchased</span>
              <span className="summary-val green">{purchasedCount}</span>
            </div>

            <div className="summary-row">
              <span className="summary-label">Items Remaining</span>
              <span className="summary-val purple">{pendingCount}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total-highlight">
              <span className="summary-label">Estimated Total</span>
              <span className="summary-val price">₹{totalPrice.toFixed(2)}</span>
            </div>

            <button
              className="checkout-action-btn"
              onClick={() => showToast('Proceeding to online supermarket checkout!', 'info')}
            >
              Order Groceries Online
            </button>
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addItem}
      />
    </div>
  );
};

export default Shopping;
