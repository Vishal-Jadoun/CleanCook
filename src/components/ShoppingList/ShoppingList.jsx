import React from 'react';
import ShoppingItem from '../ShoppingItem/ShoppingItem';
import './ShoppingList.css';

/**
 * ShoppingList Component (Modules 49-54 Shopping Cart, 61-66 Search/Filter/Sort UI)
 * Owns the presentation of the grocery list, item interactions, and empty states.
 */
const ShoppingList = ({
  items = [],
  totalPrice = 0,
  onTogglePurchased,
  onUpdateQty,
  onDelete,
  onClearPurchased
}) => {
  if (items.length === 0) {
    return (
      <div className="shopping-list-empty">
        <div className="empty-cart-icon">🛒</div>
        <h3>Your grocery list is empty</h3>
        <p>Add ingredients directly from your meal plan or tap "+ Add Item" above.</p>
      </div>
    );
  }

  const purchasedCount = items.filter((i) => i.purchased).length;

  return (
    <div className="shopping-list-card">
      <div className="shopping-list-header">
        <div className="list-status-badge">
          <span>{items.length} Total</span>
          <span className="dot-divider">•</span>
          <span>{purchasedCount} Checked</span>
        </div>

        {purchasedCount > 0 && (
          <button className="clear-purchased-link" onClick={onClearPurchased}>
            Clear Purchased ({purchasedCount})
          </button>
        )}
      </div>

      <div className="shopping-items-flow">
        {items.map((item) => (
          <ShoppingItem
            key={item.id}
            item={item}
            onTogglePurchased={() => onTogglePurchased(item.id)}
            onUpdateQty={(delta) => onUpdateQty(item.id, delta)}
            onDelete={() => onDelete(item.id)}
          />
        ))}
      </div>

      <div className="shopping-list-footer">
        <div className="total-calculation-block">
          <span className="total-label">Estimated Subtotal:</span>
          <span className="total-value">₹{totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
