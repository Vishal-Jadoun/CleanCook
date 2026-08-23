import "./ShoppingItem.css";

function ShoppingItem({ item, onToggle, onRemove }) {
  return (
    <li
      className={`shopping-item${item.checked ? " shopping-item--checked" : ""}`}
      id={`shopping-item-${item.id}`}
    >
      <label className="shopping-item-label" htmlFor={`checkbox-${item.id}`}>
        <input
          type="checkbox"
          id={`checkbox-${item.id}`}
          className="shopping-checkbox"
          checked={item.checked}
          onChange={() => onToggle(item.id)}
        />
        <span className={`shopping-item-name${item.checked ? " item-crossed" : ""}`}>
          {item.name}
        </span>
      </label>

      <span className="shopping-dots" aria-hidden="true" />

      <span className="shopping-item-quantity">{item.quantity}</span>

      <button
        className="shopping-remove-btn"
        id={`remove-item-${item.id}`}
        onClick={() => onRemove(item.id)}
        title="Remove item"
        aria-label={`Remove ${item.name}`}
      >
        ✕
      </button>
    </li>
  );
}

export default ShoppingItem;