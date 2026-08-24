import './NutritionWidget.css';

function NutritionWidget() {
  return (
    <div className="nutrition-widget">
      <div className="nutrition-header">
<div className="nutrition-header">
        <div className="nutrition-icon">
          🥗
        </div>
        <div className="nutrition-title">
          <h3>Daily Nutrition</h3>
          <p>Track your calories & macros</p>
        </div>
      </div>
      <div className="nutrition-calories-box">
        <div className="calories-text">
          <span className="cal-label">🔥 Calories</span>
          <span className="cal-value"><strong>1,450</strong> / 2,000 kcal</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill cal-bar"></div>
        </div>
      </div>
 
      <div className="macro-list">
     
        <div className="macro-item">
          <div className="macro-info">
            <span>🍗 Protein</span>
            <span><strong>85g</strong> / 120g</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill protein-bar"></div>
          </div>
        </div>
      
        <div className="macro-item">
          <div className="macro-info">
            <span>🍞 Carbs</span>
            <span><strong>180g</strong> / 250g</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill carbs-bar"></div>
          </div>
        </div>
     
        <div className="macro-item">
          <div className="macro-info">
            <span>🥑 Fat</span>
            <span><strong>45g</strong> / 65g</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill fat-bar"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NutritionWidget;
