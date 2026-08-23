import { useState } from "react";
import dummyShoppingList from "../../data/shoppingList";
import ShoppingItem from "../../components/ShoppingItem/ShoppingItem";
import "./Shopping.css";

const CATEGORY_ICONS = {
  Proteins: "🥩",
  Vegetables: "🥬",
  Dairy: "🧀",
  Pantry: "🏪",
  Spices: "🌶️",
  Fruits: "🍎",
};

function Shopping() {
  const [shoppingList, setShoppingList] = useState(dummyShoppingList);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQty, setNewItemQty] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Pantry");

  const totalItems = shoppingList.reduce(
    (sum, cat) => sum + cat.items.length, 0
  );
  const checkedItems = shoppingList.reduce(
    (sum, cat) => sum + cat.items.filter((i) => i.checked).length, 0
  );
  const progress =
    totalItems === 0 ? 0 : Math.round((checkedItems / totalItems) * 100);

  const handleToggle = (itemId) => {
    setShoppingList((prev) =>
      prev.map((cat) => ({
        ...cat,
        items: cat.items.map((item) =>
          item.id === itemId ? { ...item, checked: !item.checked } : item
        ),
      }))
    );
  };

  const handleRemove = (itemId) => {
    setShoppingList((prev) =>
      prev.map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => item.id !== itemId),
      }))
    );
  };

  const handleClearChecked = () => {
    setShoppingList((prev) =>
      prev.map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => !item.checked),
      }))
    );
  };

  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    const newItem = {
      id: `s${Date.now()}`,
      name: newItemName.trim(),
      quantity: newItemQty.trim() || "1",
      checked: false,
    };
    setShoppingList((prev) =>
      prev.map((cat) =>
        cat.category === newItemCategory
          ? { ...cat, items: [...cat.items, newItem] }
          : cat
      )
    );
    setNewItemName("");
    setNewItemQty("");
    setShowAddModal(false);
  };

  const handleExportList = () => {
    let text = "SHOPPING LIST\n" + "=".repeat(30) + "\n\n";
    shoppingList.forEach((cat) => {
      text += `${cat.category}\n`;
      cat.items.forEach((item) => {
        text += `  ${item.checked ? "[x]" : "[ ]"} ${item.name} - ${item.quantity}\n`;
      });
      text += "\n";
    });
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "shopping-list.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="shopping-page" className="shopping-page">
      <div className="shopping-container">

        {/* Header */}
        <header className="shopping-header">
          <div className="shopping-header-icon">🛒</div>
          <div className="shopping-header-text">
            <h1>Shopping List</h1>
            <p>Based on your meal plan for this week</p>
          </div>
        </header>

        {/* Progress */}
        <div className="shopping-progress" id="shopping-progress">
          <div className="shopping-progress-info">
            <span>📊</span>
            <span className="shopping-progress-label">
              <strong>{checkedItems}</strong> of{" "}
              <strong>{totalItems}</strong> items collected
            </span>
            <span className="shopping-progress-pct">{progress}%</span>
          </div>
          <div className="progress-bar" role="progressbar"
            aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Categories */}
        <div className="shopping-categories">
          {shoppingList.map((cat) => (
            <div
              className="shopping-category"
              key={cat.category}
              id={`category-${cat.category.toLowerCase()}`}
            >
              <div className="shopping-category-header">
                <span className="shopping-category-icon">
                  {CATEGORY_ICONS[cat.category] || "📦"}
                </span>
                <h2 className="category-title">{cat.category}</h2>
                <span className="category-count">
                  {cat.items.filter((i) => i.checked).length}/{cat.items.length}
                </span>
              </div>

              {cat.items.length === 0 ? (
                <p className="empty-category">No items in this category.</p>
              ) : (
                <ul className="shopping-items-list">
                  {cat.items.map((item) => (
                    <ShoppingItem
                      key={item.id}
                      item={item}
                      onToggle={handleToggle}
                      onRemove={handleRemove}
                    />
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="shopping-actions" id="shopping-actions">
          <button
            id="btn-add-item"
            className="shopping-btn shopping-btn--primary"
            onClick={() => setShowAddModal(true)}
          >
            + Add Item
          </button>
          <button
            id="btn-clear-checked"
            className="shopping-btn shopping-btn--secondary"
            onClick={handleClearChecked}
            disabled={checkedItems === 0}
          >
            Clear Checked
          </button>
          <button
            id="btn-export-list"
            className="shopping-btn shopping-btn--accent"
            onClick={handleExportList}
          >
            Export List
          </button>
        </div>
      </div>

      {/* Modal */}
      {showAddModal && (
        <div
          className="modal-overlay"
          id="add-item-modal-overlay"
          onClick={(e) => {
            if (e.target.classList.contains("modal-overlay"))
              setShowAddModal(false);
          }}
        >
          <div className="modal" id="add-item-modal">
            <h3 className="modal-title">➕ Add New Item</h3>

            <label className="modal-label" htmlFor="modal-item-name">Item Name</label>
            <input
              id="modal-item-name"
              className="modal-input"
              type="text"
              placeholder="e.g. Chicken Breast"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
              autoFocus
            />

            <label className="modal-label" htmlFor="modal-item-qty">Quantity</label>
            <input
              id="modal-item-qty"
              className="modal-input"
              type="text"
              placeholder="e.g. 500g, 2 pcs, 1L"
              value={newItemQty}
              onChange={(e) => setNewItemQty(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
            />

            <label className="modal-label" htmlFor="modal-item-cat">Category</label>
            <select
              id="modal-item-cat"
              className="modal-input modal-select"
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value)}
            >
              {shoppingList.map((cat) => (
                <option key={cat.category} value={cat.category}>
                  {CATEGORY_ICONS[cat.category] || "📦"} {cat.category}
                </option>
              ))}
            </select>

            <div className="modal-actions">
              <button
                id="modal-btn-cancel"
                className="shopping-btn shopping-btn--ghost"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                id="modal-btn-add"
                className="shopping-btn shopping-btn--primary"
                onClick={handleAddItem}
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Shopping;