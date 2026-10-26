import { useState } from "react";
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

function WaterTracker() {
  const [glasses, setGlasses] = useState(loadWaterCount);
  const [storageError, setStorageError] = useState("");

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

  // Example goal for the project demo.
  const goal = 8;
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

        <div className="water-actions">
          <button type="button" onClick={addGlass}>
            + Add glass
          </button>

          <button
            type="button"
            onClick={removeGlass}
            disabled={glasses === 0}
          >
            − Remove
          </button>

          <button
            type="button"
            onClick={resetWater}
            disabled={glasses === 0}
          >
            Reset
          </button>
        </div>

        {glasses >= goal && (
          <p className="water-goal-message">
            You reached your demo goal!
          </p>
        )}

        <small className="water-note">
          Demo goal: 8 glasses. Your count is saved in this browser and
          resets when you reopen or refresh the tracker on a new day.
        </small>

        {storageError && <p role="status">{storageError}</p>}
      </div>
    </div>
  );
}

export default WaterTracker;