import { useState, useEffect } from "react";
import "./BMICalculator.css";

function loadSavedMeasurements() {
  try {
    const saved = localStorage.getItem("cleancook-profile");
    if (!saved) {
      return { height: "", weight: "" };
    }
    const profile = JSON.parse(saved);
    return {
      height: profile?.height ? String(profile.height) : "",
      weight: profile?.weight ? String(profile.weight) : "",
    };
  } catch {
    return { height: "", weight: "" };
  }
}

function getBmiCategory(value) {
  const val = Number(value);
  if (!Number.isFinite(val) || val <= 0) return null;
  if (val < 18.5) return { label: "Underweight", className: "category-underweight" };
  if (val < 25) return { label: "Normal", className: "category-normal" };
  if (val < 30) return { label: "Overweight", className: "category-overweight" };
  return { label: "Obese", className: "category-obese" };
}

function BMICalculator({ initialHeight, initialWeight }) {
  const [savedMeasurements, setSavedMeasurements] = useState(loadSavedMeasurements);
  const [height, setHeight] = useState(initialHeight ? String(initialHeight) : savedMeasurements.height);
  const [weight, setWeight] = useState(initialWeight ? String(initialWeight) : savedMeasurements.weight);
  const [bmi, setBmi] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    function handleStorage(e) {
      if (e.key === "cleancook-profile") {
        const refreshed = loadSavedMeasurements();
        setSavedMeasurements(refreshed);
        if (!height) setHeight(refreshed.height);
        if (!weight) setWeight(refreshed.weight);
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [height, weight]);

  function calculateBmi(event) {
    event.preventDefault();

    const heightNumber = Number(height);
    const weightNumber = Number(weight);

    if (
      !Number.isFinite(heightNumber) ||
      !Number.isFinite(weightNumber) ||
      heightNumber <= 0 ||
      weightNumber <= 0
    ) {
      setError("Enter valid height and weight greater than zero.");
      setBmi("");
      return;
    }

    // Convert centimetres into metres.
    const heightInMetres = heightNumber / 100;

    // BMI = weight in kg / (height in metres)^2
    const result = weightNumber / (heightInMetres * heightInMetres);

    setBmi(result.toFixed(1));
    setError("");
  }

  function resetCalculator() {
    setHeight("");
    setWeight("");
    setBmi("");
    setError("");
  }

  const category = bmi ? getBmiCategory(bmi) : null;

  return (
    <div className="bmi-calculator">
      <h3>BMI Calculator</h3>
      <p>Enter your height and weight to calculate your Body Mass Index.</p>

      <form onSubmit={calculateBmi}>
        <label htmlFor="bmi-height">Height (cm)</label>
        <input
          id="bmi-height"
          type="number"
          min="1"
          step="any"
          placeholder="Example: 175"
          value={height}
          onChange={(event) => {
            setHeight(event.target.value);
            setBmi("");
            setError("");
          }}
          required
        />

        <label htmlFor="bmi-weight">Weight (kg)</label>
        <input
          id="bmi-weight"
          type="number"
          min="1"
          step="any"
          placeholder="Example: 68"
          value={weight}
          onChange={(event) => {
            setWeight(event.target.value);
            setBmi("");
            setError("");
          }}
          required
        />

        <div className="bmi-actions">
          <button type="submit">Calculate</button>

          <button
            type="button"
            className="bmi-reset"
            onClick={resetCalculator}
          >
            Reset
          </button>
        </div>
      </form>

      {error && <p role="alert" className="bmi-error">{error}</p>}

      {bmi && (
        <div className="bmi-result-wrapper" role="status">
          <p className="bmi-result">
            Your BMI: <strong>{bmi}</strong>
          </p>
          {category && (
            <span className={`bmi-category-badge ${category.className}`}>
              {category.label}
            </span>
          )}
        </div>
      )}

      <small className="bmi-disclaimer">
        Measurements are auto-loaded from your saved Profile. BMI is a general fitness metric, not a clinical diagnosis.
      </small>
    </div>
  );
}

export default BMICalculator;