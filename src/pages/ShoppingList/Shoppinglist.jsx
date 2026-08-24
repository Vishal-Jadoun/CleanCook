import "./Shoppinglist.css";

function ShoppingList() {
  return (
    <section id="shoppinglist-page" className="shoppinglist-page">
      <div className="shoppinglist-wrapper">

        <header className="shoppinglist-header">
          <span className="shoppinglist-icon">🧾</span>
          <div>
            <h1 className="shoppinglist-title">My Shopping List</h1>
            <p className="shoppinglist-subtitle">All items grouped by category</p>
          </div>
        </header>

        <div className="shoppinglist-body">


          <div className="sl-category">
            <div className="sl-category-header">
              <span>🥩</span>
              <h2 className="sl-category-name">Proteins</h2>
              <span className="sl-category-badge">3 items</span>
            </div>
            <ul className="sl-items">
              <li className="sl-item">
                <span className="sl-item-dot" />
                <span className="sl-item-name">Chicken Breast</span>
                <span className="sl-item-qty">500g</span>
              </li>
              <li className="sl-item sl-item--done">
                <span className="sl-item-dot" />
                <span className="sl-item-name">Eggs</span>
                <span className="sl-item-qty">12</span>
                <span className="sl-item-tag">✓ Got it</span>
              </li>
              <li className="sl-item">
                <span className="sl-item-dot" />
                <span className="sl-item-name">Paneer</span>
                <span className="sl-item-qty">250g</span>
              </li>
            </ul>
          </div>

  
          <div className="sl-category">
            <div className="sl-category-header">
              <span>🥬</span>
              <h2 className="sl-category-name">Vegetables</h2>
              <span className="sl-category-badge">2 items</span>
            </div>
            <ul className="sl-items">
              <li className="sl-item">
                <span className="sl-item-dot" />
                <span className="sl-item-name">Tomatoes</span>
                <span className="sl-item-qty">6</span>
              </li>
              <li className="sl-item sl-item--done">
                <span className="sl-item-dot" />
                <span className="sl-item-name">Onions</span>
                <span className="sl-item-qty">4</span>
                <span className="sl-item-tag">✓ Got it</span>
              </li>
            </ul>
          </div>


          <div className="sl-category">
            <div className="sl-category-header">
              <span>🏪</span>
              <h2 className="sl-category-name">Pantry</h2>
              <span className="sl-category-badge">2 items</span>
            </div>
            <ul className="sl-items">
              <li className="sl-item">
                <span className="sl-item-dot" />
                <span className="sl-item-name">Basmati Rice</span>
                <span className="sl-item-qty">1 kg</span>
              </li>
              <li className="sl-item sl-item--done">
                <span className="sl-item-dot" />
                <span className="sl-item-name">Olive Oil</span>
                <span className="sl-item-qty">1 bottle</span>
                <span className="sl-item-tag">✓ Got it</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ShoppingList;
