import { Link } from "react-router-dom";
import "./NutritionWidget.css";

const defaultNutrition = {
  calories: 1450,
  protein: 85,
  carbs: 180,
  fat: 45,
};

const defaultTargets = {
  calories: 2000,
  protein: 120,
  carbs: 250,
  fat: 65,
};

function NutritionWidget({
  nutrition = defaultNutrition,
  targets = defaultTargets,
  isSample = true,
}) {
  const currentNutrition = { ...defaultNutrition, ...nutrition };
  const currentTargets = { ...defaultTargets, ...targets };

  const nutrients = [
    {
      name: "Protein",
      value: currentNutrition.protein,
      goal: currentTargets.protein,
      icon: "🍗",
      color: "#8245d2",
    },
    {
      name: "Carbs",
      value: currentNutrition.carbs,
      goal: currentTargets.carbs,
      icon: "🍞",
      color: "#d47b13",
    },
    {
      name: "Fat",
      value: currentNutrition.fat,
      goal: currentTargets.fat,
      icon: "🥑",
      color: "#d54d78",
    },
  ];

  return (
    <section className="nutrition-section">
      <div className="section-title">
        <h2>Nutrition {isSample ? "— Sample Day" : "Overview"}</h2>
        <Link to="/planner">Open planner</Link>
      </div>

      {isSample && (
        <p className="dashboard-note">
          Amounts and macro targets are demonstrative. Open your Weekly Planner to schedule meals and update active macros.
        </p>
      )}

      <div className="nutrition-container">
        {nutrients.map((nutrient) => {
          const percentage = Math.round(
            (nutrient.value / Math.max(nutrient.goal, 1)) * 100
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
                  aria-label={`${nutrient.name} goal progress`}
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
