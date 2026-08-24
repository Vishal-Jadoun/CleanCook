import "./ShoppingItem.css";

function ShoppingItem({ id, name, quantity, checked }) {
  return (
    <li className={`shopping-item${checked ? " shopping-item--done" : ""}`} id={`shopping-item-${id}`}>

      <span className="shopping-item-status">
        {checked ? "✓" : "○"}
      </span>

      <span className="shopping-item-name">{name}</span>

      <span className="shopping-dots" aria-hidden="true" />

      <span className="shopping-item-quantity">{quantity}</span>

    </li>
  );
}

export default ShoppingItem;