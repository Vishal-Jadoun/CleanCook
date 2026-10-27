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

function loadSavedWaterGoal() {
  try {
    const saved = localStorage.getItem("cleancook-profile");
    if (!saved) return 8;

    const profile = JSON.parse(saved);
    const savedGoal = Number(profile?.waterGoal);

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
  const [savedGoal, setSavedGoal] = useState(loadSavedWaterGoal);
  const [storageError, setStorageError] = useState("");

  const goal =
    Number.isFinite(Number(goalProp)) && Number(goalProp) > 0
      ? Math.round(Number(goalProp))
      : savedGoal;

  useEffect(() => {
    function handleStorage(e) {
      if (e.key === "cleancook-profile") {
        setSavedGoal(loadSavedWaterGoal());
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

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

        <div className="water-drops-row" aria-label="Visual water intake indicator">
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
          <button type="button" onClick={addGlass} aria-label="Add one glass">
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
            🎉 You reached your daily hydration goal!
          </p>
        )}

        <small className="water-note">
          Goal is {goal} glasses (from saved Profile). Daily intake persists for today and resets on new dates.
        </small>

        {storageError && <p role="status">{storageError}</p>}
      </div>
    </div>
  );
}

export default WaterTracker;