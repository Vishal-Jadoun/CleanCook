import "./WaterTracker.css";
import { useEffect, useState } from "react";

function getToday() {
  return new Date().toLocaleDateString("en-CA");
}

function loadWaterCount() {
  try {
    const saved = localStorage.getItem("cleancook-water");
    if (saved === null) {
      return 0;
    }

    const data = JSON.parse(saved);
    if (
      data !== null &&
      data.date === getToday() &&
      Number.isInteger(data.glasses) &&
      data.glasses >= 0
    ) {
      return data.glasses;
    }

    return 0;
  } catch {
    return 0;
  }
}

function loadWaterGoal() {
  try {
    const saved = localStorage.getItem("cleancook-profile");
    if (saved === null) {
      return 8;
    }

    const profile = JSON.parse(saved);
    const savedGoal = Number(profile?.waterGoal);

    if (Number.isInteger(savedGoal) && savedGoal > 0) {
      return savedGoal;
    }
    if (Number.isFinite(savedGoal) && savedGoal > 0) {
      return Math.round(savedGoal);
    }

    return 8;
  } catch {
    return 8;
  }
}

function WaterTracker({ goal: goalProp }) {
  const [glasses, setGlasses] = useState(loadWaterCount);
  const [savedGoal, setSavedGoal] = useState(loadWaterGoal);
  const [storageError, setStorageError] = useState("");

  // Use passed prop if valid, otherwise use profile saved goal with fallback to 8.
  const goal =
    Number.isFinite(Number(goalProp)) && Number(goalProp) > 0
      ? Math.round(Number(goalProp))
      : savedGoal;

  // React to cross-tab or in-page profile changes.
  useEffect(() => {
    function handleStorageChange(event) {
      if (event.key === "cleancook-profile") {
        setSavedGoal(loadWaterGoal());
      }
    }

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Save glasses to localStorage for today's date whenever count changes.
  useEffect(() => {
    try {
      const data = {
        date: getToday(),
        glasses: glasses,
      };

      localStorage.setItem("cleancook-water", JSON.stringify(data));
      setStorageError("");
    } catch {
      setStorageError("Your browser could not save the water count.");
    }
  }, [glasses]);

  const progress = Math.min((glasses / goal) * 100, 100);

  function addGlass() {
    setGlasses((previous) => previous + 1);
  }

  function removeGlass() {
    setGlasses((previous) => Math.max(previous - 1, 0));
  }

  function resetWater() {
    setGlasses(0);
  }

  return (
    <div className="summary-card water-card">
      <div className="summary-icon" aria-hidden="true">
        💧
      </div>

      <div className="summary-content">
        <h3>Water Intake</h3>

        <p className="water-count" aria-live="polite">
          <strong>{glasses}</strong> / {goal} glasses
        </p>

        <progress
          className="water-progress"
          value={progress}
          max="100"
          aria-label="Progress towards water goal"
        />

        {/* Dynamic visual indicator with interactive clickable drops */}
        <div
          className="water-drops-row"
          aria-label="Visual water intake indicator"
        >
          {Array.from({ length: Math.min(goal, 16) }, (_, i) => (
            <span
              key={i}
              className={`water-drop-icon ${i < glasses ? "drop-filled" : "drop-empty"}`}
              onClick={() => setGlasses(i + 1)}
              title={`Set to ${i + 1} glasses`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setGlasses(i + 1);
                }
              }}
              aria-label={`Glass ${i + 1} of ${goal}`}
            >
              💧
            </span>
          ))}
        </div>

        <div className="water-actions">
          <button
            type="button"
            onClick={addGlass}
            aria-label="Add one glass"
          >
            + Add glass
          </button>

          <button
            type="button"
            onClick={removeGlass}
            disabled={glasses === 0}
            aria-label="Remove one glass"
          >
            − Remove
          </button>

          <button
            type="button"
            onClick={resetWater}
            disabled={glasses === 0}
            aria-label="Reset water count"
          >
            Reset
          </button>
        </div>

        {glasses >= goal && (
          <p className="water-goal-message" role="status">
            🎉 You reached your saved goal!
          </p>
        )}

        <small className="water-note">
          Your saved goal is {goal} glasses (from your saved Profile).
          Change it in Profile, then reopen the dashboard. Your daily count
          is saved in this browser and resets when you reopen or refresh the
          tracker on a new day.
        </small>

        {storageError && <p role="status">{storageError}</p>}
      </div>
    </div>
  );
}

export default WaterTracker;