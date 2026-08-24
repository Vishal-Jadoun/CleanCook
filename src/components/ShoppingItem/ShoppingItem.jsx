import React from 'react';
import './ShoppingItem.css';

const ShoppingItem = ({ item, onUpdateQty }) => {
  return (
    <div className="list-row">
      
      {/* Icon and Name block */}
      <div className="row-item-info">
        <div className="row-icon">{item.image}</div>
        <div className="row-text">
          <h4>{item.name}</h4>
          <p>{item.store}</p>
        </div>
      </div>

      {/* Price per unit */}
      <div className="row-price-unit">
        ${item.price.toFixed(2)} per Unit
      </div>

      {/* The pill counter */}
      <div className="row-counter">
        <button onClick={() => onUpdateQty(-1)}>-</button>
        <span>{item.qty}</span>
        <button onClick={() => onUpdateQty(1)}>+</button>
      </div>

      {/* Total Price and menu */}
      <div className="row-total">
        ${(item.price * item.qty).toFixed(2)}
      </div>
      <div className="row-menu">⋮</div>

    </div>
  );
};

export default ShoppingItem;
