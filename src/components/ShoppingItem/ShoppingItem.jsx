import React from 'react';
import './ShoppingItem.css';

/**
 * ShoppingItem Component (Modules 49-54 Shopping Cart Item)
 * Represents an individual interactive grocery item.
 */
const ShoppingItem = ({ item, onTogglePurchased, onUpdateQty, onDelete }) => {
  return (
    <div className={`shopping-item-row ${item.purchased ? 'item-purchased' : ''}`}>
      <label className="checkbox-container" title={item.purchased ? 'Mark as to-buy' : 'Mark as purchased'}>
        <input
          type="checkbox"
          checked={item.purchased}
          onChange={onTogglePurchased}
          className="item-checkbox"
        />
        <span className="custom-checkmark"></span>
      </label>

      <div className="item-icon-wrapper">{item.image || '🛒'}</div>

      <div className="item-meta-info">
        <h4 className={`item-name ${item.purchased ? 'strike' : ''}`}>{item.name}</h4>
        <div className="item-tags">
          <span className="category-tag">{item.category}</span>
          {item.store && <span className="store-tag">{item.store}</span>}
        </div>
      </div>

      <div className="item-unit-price">₹{Number(item.price).toFixed(2)} / ea</div>

      <div className="item-qty-controls">
        <button
          className="qty-btn"
          onClick={() => onUpdateQty(-1)}
          disabled={item.qty <= 1}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="qty-value">{item.qty}</span>
        <button
          className="qty-btn"
          onClick={() => onUpdateQty(1)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <div className="item-subtotal">₹{(item.price * item.qty).toFixed(2)}</div>

      <button
        className="item-remove-btn"
        onClick={onDelete}
        title="Remove item"
        aria-label={`Remove ${item.name}`}
      >
        &times;
      </button>
    </div>
  );
};

export default ShoppingItem;
