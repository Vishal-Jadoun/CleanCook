import { Link } from "react-router-dom";

function NutritionWidget({ nutrition }) {
  const nutrients = [
    {
      name: "Protein",
      value: nutrition.protein,
      goal: 120,
      icon: "🍗",
      color: "#8245d2",
    },
    {
      name: "Carbs",
      value: nutrition.carbs,
      goal: 250,
      icon: "🍞",
      color: "#d47b13",
    },
    {
      name: "Fat",
      value: nutrition.fat,
      goal: 65,
      icon: "🥑",
      color: "#d54d78",
    },
  ];

  return (
    <section className="nutrition-section">
      <div className="section-title">
        <h2>Nutrition — Sample Day</h2>
        <Link to="/planner">Open planner</Link>
      </div>

      <p className="dashboard-note">
        Amounts and macro targets are examples for this demo.
        Planned meals are not connected yet.
      </p>

      <div className="nutrition-container">
        {nutrients.map((nutrient) => {
          const percentage = Math.round(
            (nutrient.value / nutrient.goal) * 100
          );

          return (
            <div className="nutrition-item" key={nutrient.name}>
              <div className="nutrition-icon" aria-hidden="true">
                {nutrient.icon}
              </div>

              <div className="nutrition-details">
                <h3>{nutrient.name}</h3>

                <p>
                  <strong>{nutrient.value}g</strong> / {nutrient.goal}g
                </p>

                <progress
                  className="dashboard-macro-progress"
                  value={Math.min(percentage, 100)}
                  max="100"
                  style={{ accentColor: nutrient.color }}
                  aria-label={`${nutrient.name} sample goal progress`}
                />

                <span className="nutrition-percent">
                  {percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default NutritionWidget;