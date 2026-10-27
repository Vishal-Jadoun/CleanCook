import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BMICalculator from "../../components/BMICalculator/BMICalculator";
import WaterTracker from "../../components/WaterTracker/WaterTracker";
import NutritionWidget from "../../components/NutritionWidget/NutritionWidget";
import "./Dashboard.css";

const defaultProfile = {
  name: "Aditya Bansal",
  dailyCalories: 2000,
};

function loadDashboardProfile() {
  try {
    const saved = localStorage.getItem("cleancook-profile");
    if (!saved) return defaultProfile;

    const profile = JSON.parse(saved);
    if (!profile) return defaultProfile;

    const calories = Number(profile.dailyCalories);

    return {
      name:
        typeof profile.name === "string" && profile.name.trim()
          ? profile.name.trim()
          : defaultProfile.name,
      dailyCalories:
        Number.isFinite(calories) && calories > 0
          ? calories
          : defaultProfile.dailyCalories,
    };
  } catch {
    return defaultProfile;
  }
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

const sampleNutrition = {
  calories: 1450,
  protein: 85,
  carbs: 180,
  fat: 45,
};

const recipeIdeas = [
  { name: "Paneer Salad Bowl", icon: "🥗" },
  { name: "Oats & Berries Crunch", icon: "🥣" },
  { name: "South Indian Dosa", icon: "🥞" },
  { name: "Superfood Avocado Bowl", icon: "🥑" },
];

function Dashboard() {
  const [profile, setProfile] = useState(loadDashboardProfile);

  useEffect(() => {
    function handleStorage(e) {
      if (e.key === "cleancook-profile") {
        setProfile(loadDashboardProfile());
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const greeting = getGreeting();
  const initial = profile.name.charAt(0).toUpperCase() || "A";
  const caloriePercent = Math.round(
    (sampleNutrition.calories / Math.max(profile.dailyCalories, 1)) * 100
  );

  return (
    <section id="dashboard-page" className="dashboard-page">
      <div className="dashboard">
        <header className="dashboard-header">
          <div>
            <h1>
              {greeting}, <span>{profile.name}!</span> 👋
            </h1>
            <p>Welcome to your personal wellness and meal planning hub.</p>
          </div>

          <Link
            to="/profile"
            className="dashboard-profile"
            aria-label="View user profile"
          >
            <div className="profile-circle">{initial}</div>
            <span aria-hidden="true">⌄</span>
          </Link>
        </header>

        {/* Bento Summary Grid */}
        <div className="summary-cards">
          <article className="summary-card calories-card">
            <div className="summary-icon" aria-hidden="true">
              🔥
            </div>

            <div className="summary-content">
              <h3>Calories — Sample Day</h3>

              <div className="summary-number">
                {sampleNutrition.calories.toLocaleString()}
              </div>

              <p>/ {profile.dailyCalories.toLocaleString()} kcal target</p>

              <progress
                className="dashboard-calorie-progress"
                value={Math.min(caloriePercent, 100)}
                max="100"
                aria-label="Sample calories compared with your saved profile goal"
              />

              <span className="progress-text">
                {caloriePercent}% of your saved goal
              </span>

              <small className="dashboard-note">
                Intake is sample data. The target comes from your saved Profile.
              </small>
            </div>
          </article>

          <WaterTracker />

          <BMICalculator />
        </div>

        {/* Modular Nutrition Widget */}
        <NutritionWidget
          nutrition={sampleNutrition}
          targets={{
            calories: profile.dailyCalories,
            protein: 120,
            carbs: 250,
            fat: 65,
          }}
          isSample={true}
        />

        {/* Bottom Section */}
        <div className="bottom-section">
          <section className="favorites-section">
            <div className="section-title">
              <h2>Recipe Ideas</h2>
              <Link to="/recipes">Browse recipes</Link>
            </div>

            <p className="dashboard-note">
              Curated suggestions from our healthy bowl collection.
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
              👤 Edit your profile and health goals
            </Link>

            <Link className="dashboard-action" to="/planner">
              📅 Open 7-day weekly meal planner
            </Link>

            <Link className="dashboard-action" to="/recipes">
              🥗 Explore healthy recipes catalog
            </Link>

            <Link className="dashboard-action" to="/shopping">
              🛒 View smart grocery checklist
            </Link>

            <p className="dashboard-note">
              Profile updates persist across page reloads and browser sessions.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
