import { useState } from "react";
import "./WaterTracker.css";

function WaterTracker() {
  const [glasses, setGlasses] = useState(0);

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
          Demo goal: 8 glasses. This counter resets when the component
          is reloaded.
        </small>
      </div>
    </div>
  );
}

export default WaterTracker;