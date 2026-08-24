import ShoppingItem from "../../components/ShoppingItem/ShoppingItem";
import "./Shopping.css";

function Shopping() {
  return (
    <section id="shopping-page" className="shopping-page">
      <div className="shopping-container">

        <header className="shopping-header">
          <div className="shopping-header-icon">🛒</div>
          <div className="shopping-header-text">
            <h1>Shopping List</h1>
            <p>Based on your meal plan for this week</p>
          </div>
        </header>

        <div className="shopping-progress" id="shopping-progress">
          <div className="shopping-progress-info">
            <span>📊</span>
            <span className="shopping-progress-label">
              <strong>3</strong> of <strong>7</strong> items collected
            </span>
            <span className="shopping-progress-pct">43%</span>
          </div>
          <div className="progress-bar" role="progressbar"
               aria-valuenow="43" aria-valuemin="0" aria-valuemax="100">
            <div className="progress-fill" />
          </div>
        </div>

        <div className="shopping-categories">


          <div className="shopping-category" id="category-proteins">
            <div className="shopping-category-header">
              <span className="shopping-category-icon">🥩</span>
              <h2 className="category-title">Proteins</h2>
              <span className="category-count">1/3</span>
            </div>
            <ul className="shopping-items-list">
              <ShoppingItem id="s1" name="Chicken Breast" quantity="500g" checked={false} />
              <ShoppingItem id="s2" name="Eggs"           quantity="12"   checked={true}  />
              <ShoppingItem id="s3" name="Paneer"         quantity="250g" checked={false} />
            </ul>
          </div>


          <div className="shopping-category" id="category-vegetables">
            <div className="shopping-category-header">
              <span className="shopping-category-icon">🥬</span>
              <h2 className="category-title">Vegetables</h2>
              <span className="category-count">1/2</span>
            </div>
            <ul className="shopping-items-list">
              <ShoppingItem id="s4" name="Tomatoes" quantity="6" checked={false} />
              <ShoppingItem id="s5" name="Onions"   quantity="4" checked={true}  />
            </ul>
          </div>

          <div className="shopping-category" id="category-pantry">
            <div className="shopping-category-header">
              <span className="shopping-category-icon">🏪</span>
              <h2 className="category-title">Pantry</h2>
              <span className="category-count">1/2</span>
            </div>
            <ul className="shopping-items-list">
              <ShoppingItem id="s11" name="Basmati Rice" quantity="1 kg"     checked={false} />
              <ShoppingItem id="s13" name="Olive Oil"    quantity="1 bottle"  checked={true}  />
            </ul>
          </div>

        </div>


        <details className="add-item-details" id="add-item-section">
          <summary className="shopping-btn shopping-btn--primary" id="btn-add-item">
             Add Item
          </summary>
          <div className="add-item-form">
            <label className="modal-label" htmlFor="new-item-name">Item Name</label>
            <input id="new-item-name" className="modal-input" type="text"
                   placeholder="e.g. Chicken Breast" />

            <label className="modal-label" htmlFor="new-item-qty">Quantity</label>
            <input id="new-item-qty" className="modal-input" type="text"
                   placeholder="e.g. 500g, 2 pcs, 1L" />

            <label className="modal-label" htmlFor="new-item-cat">Category</label>
            <select id="new-item-cat" className="modal-input modal-select">
              <option value="Proteins">🥩 Proteins</option>
              <option value="Vegetables">🥬 Vegetables</option>
              <option value="Pantry">🏪 Pantry</option>
            </select>

            <div className="modal-actions">
              <button className="shopping-btn shopping-btn--primary" type="submit">
                ✔ Add Item
              </button>
            </div>
          </div>
        </details>

      </div>
    </section>
  );
}

export default Shopping;
