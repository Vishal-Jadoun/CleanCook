import React, { useState } from 'react';
import ShoppingItem from '../../components/ShoppingItem/ShoppingItem';
import './Shopping.css';

const INITIAL_ITEMS = [
  { id: 1, name: "Banana", store: "FreshCo", price: 7.00, qty: 2, image: "🍌" },
  { id: 2, name: "Beef Jerky", store: "IGA", price: 7.00, qty: 2, image: "🥩" },
  { id: 3, name: "Caramel Cake", store: "FreshCo", price: 7.00, qty: 2, image: "🍰" },
];

const CATEGORIES = [
  { name: "Sweets", count: 12, bg: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=500&q=80" },
  { name: "Freezer", count: 5, bg: "https://images.unsplash.com/photo-1571131604555-467611a2f646?w=500&q=80" },
  { name: "Meat", count: 43, bg: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&q=80" },
  { name: "Snacks", count: 23, bg: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=500&q=80" },
  { name: "Dairy", count: 45, bg: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=500&q=80" },
  { name: "Beverages", count: 67, bg: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&q=80" },
];

const RECOMMENDED = [
  { id: 101, name: "Mocha Cake", price: 7.00, store: "IGA", image: "🍩" },
  { id: 102, name: "Cup Cake", price: 7.00, store: "IGA", image: "🧁" },
  { id: 103, name: "Caramel Cake", price: 7.00, store: "IGA", image: "🍰" },
];

const Shopping = () => {
  const [items, setItems] = useState(INITIAL_ITEMS);

  const updateQuantity = (id, delta) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, qty: Math.max(1, item.qty + delta) };
      }
      return item;
    }));
  };

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="dashboard-container">
      
      {/* LEFT COLUMN: The List */}
      <div className="left-column">
        <div className="header-row">
          <div>
            <h1 className="main-title">Shopping List</h1>
            <p className="subtitle">33 items, 5 near expiration</p>
          </div>
          <button className="add-circle-btn">+</button>
        </div>

        {/* Filter Pills */}
        <div className="filter-pills">
          <span className="pill">Today</span>
          <span className="pill active">Tomorrow</span>
          <span className="pill">Friday</span>
        </div>

        {/* The List */}
        <div className="shopping-list">
          {items.map(item => (
            <ShoppingItem 
              key={item.id} 
              item={item} 
              onUpdateQty={(delta) => updateQuantity(item.id, delta)} 
            />
          ))}
          
          <div className="total-row">
            <span>Total</span>
            <span className="total-price">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-bar-container">
          <input type="text" placeholder="🔍 Search shopping list" className="search-input" />
        </div>

        {/* Recently Searched */}
        <div className="section-header">
          <h3>Recently Searched Items</h3>
          <span className="see-all">See all →</span>
        </div>
        <div className="horizontal-scroll">
          {RECOMMENDED.map(item => (
            <div key={item.id} className="small-product-card">
              <button className="small-add-btn">+</button>
              <div className="emoji-img">{item.image}</div>
              <h4>{item.name}</h4>
              <p>${item.price.toFixed(2)} <span>{item.store}</span></p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: Recommended & Categories */}
      <div className="right-column">
        
        {/* Recommended */}
        <div className="section-header">
          <h3>Recommended</h3>
          <span className="see-all">See all →</span>
        </div>
        <div className="horizontal-scroll">
          {RECOMMENDED.map(item => (
            <div key={item.id} className="large-product-card">
              <button className="small-add-btn">+</button>
              <div className="emoji-img">{item.image}</div>
              <h4>{item.name}</h4>
              <p>${item.price.toFixed(2)} <span>{item.store}</span></p>
            </div>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="section-header" style={{ marginTop: '40px' }}>
          <h3>Categories</h3>
          <span className="see-all">See all →</span>
        </div>
        <div className="categories-grid">
          {CATEGORIES.map(cat => (
            <div key={cat.name} className="category-card" style={{ backgroundImage: `url(${cat.bg})` }}>
              <div className="category-overlay">
                <span className="cat-count">{cat.count.toString().padStart(2, '0')}</span>
                <span className="cat-name">{cat.name}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default Shopping;

