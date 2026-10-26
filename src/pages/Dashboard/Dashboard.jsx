import { useState } from "react";
import { Link } from "react-router-dom";
import BMICalculator from "../../components/BMICalculator/BMICalculator";
import WaterTracker from "../../components/WaterTracker/WaterTracker";
import NutritionWidget from "../../components/NutritionWidget/NutritionWidget";
import "./Dashboard.css";

function loadDashboardProfile() {
  const defaults = {
    name: "Aditya Bansal",
    dailyCalories: 2000,
  };

  try {
    const saved = localStorage.getItem("cleancook-profile");
    const profile = saved ? JSON.parse(saved) : null;

    if (!profile) {
      return defaults;
    }

    const calories = Number(profile.dailyCalories);

    return {
      name:
        typeof profile.name === "string" && profile.name.trim()
          ? profile.name.trim()
          : defaults.name,
      dailyCalories:
        Number.isFinite(calories) && calories > 0
          ? calories
          : defaults.dailyCalories,
    };
  } catch {
    return defaults;
  }
}

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 18) {
    return "Good afternoon";
  }

  return "Good evening";
}

// Example values until the team's planner is connected.
const sampleNutrition = {
  calories: 1450,
  protein: 85,
  carbs: 180,
  fat: 45,
};

const recipeIdeas = [
  { name: "Paneer Salad", icon: "🥗" },
  { name: "Oats & Berries", icon: "🥣" },
  { name: "Masala Dosa", icon: "🥞" },
  { name: "Veg Bowl", icon: "🥑" },
];

function Dashboard() {
  const [profile] = useState(loadDashboardProfile);

  const firstName = profile.name.split(/\s+/)[0];
  const initial = profile.name.charAt(0).toUpperCase();

  const caloriePercent = Math.round(
    (sampleNutrition.calories / profile.dailyCalories) * 100
  );

  return (
    <section id="dashboard-page" className="dashboard-page">
      <div className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>
              {getGreeting()}, <span>{firstName}!</span> 👋
            </h1>
            <p>Your health tools and daily goals in one place.</p>
          </div>

          <Link
            to="/profile"
            className="dashboard-profile"
            aria-label="Open your profile"
          >
            <div className="profile-circle">{initial}</div>
            <span>Edit profile</span>
          </Link>
        </div>

        <div className="summary-cards">
          <div className="summary-card calories-card">
            <div className="summary-icon" aria-hidden="true">
              🔥
            </div>

            <div className="summary-content">
              <h3>Calories — Sample Day</h3>

              <div className="summary-number">
                {sampleNutrition.calories.toLocaleString()}
              </div>

              <p>
                / {profile.dailyCalories.toLocaleString()} kcal
              </p>

              <progress
                className="dashboard-calorie-progress"
                value={Math.min(caloriePercent, 100)}
                max="100"
                aria-label="Sample calories compared with your saved goal"
              />

              <span className="progress-text">
                {caloriePercent}% of your saved goal
              </span>

              <small className="dashboard-note">
                Intake is sample data. The target comes from your profile.
              </small>
            </div>
          </div>

          <BMICalculator />
          <WaterTracker />
        </div>

        <NutritionWidget nutrition={sampleNutrition} />

        <div className="bottom-section">
          <section className="favorites-section">
            <div className="section-title">
              <h2>Recipe Ideas</h2>
              <Link to="/recipes">Browse recipes</Link>
            </div>

            <p className="dashboard-note">
              Example ideas, not your saved favorites.
            </p>

            <div className="favorite-items">
              {recipeIdeas.map((recipe) => (
                <div className="favorite-card" key={recipe.name}>
                  <div className="food-placeholder" aria-hidden="true">
                    {recipe.icon}
                  </div>

                  <div className="favorite-info">
                    <h3>{recipe.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="activity-section">
            <div className="section-title">
              <h2>Quick Actions</h2>
            </div>

            <Link className="dashboard-action" to="/profile">
              👤 Edit your profile and goals
            </Link>

            <Link className="dashboard-action" to="/planner">
              📅 Open your meal planner
            </Link>

            <Link className="dashboard-action" to="/recipes">
              🥗 Explore recipes
            </Link>

            <p className="dashboard-note">
              After saving profile changes, reopen this dashboard to
              load the updated values.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;