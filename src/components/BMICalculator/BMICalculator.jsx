import { useState } from "react";
import "./BMICalculator.css";

function loadMeasurements() {
  try {
    const saved = localStorage.getItem("cleancook-profile");
    const profile = saved ? JSON.parse(saved) : null;

    return {
      height: profile?.height || "",
      weight: profile?.weight || "",
    };
  } catch {
    return {
      height: "",
      weight: "",
    };
  }
}

function BMICalculator() {
  const [savedMeasurements] = useState(loadMeasurements);

const [height, setHeight] = useState(savedMeasurements.height);
const [weight, setWeight] = useState(savedMeasurements.weight);
  const [bmi, setBmi] = useState("");
  const [error, setError] = useState("");

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

    // BMI = weight in kg / height in metres squared.
    const result =
      weightNumber / (heightInMetres * heightInMetres);

    setBmi(result.toFixed(1));
    setError("");
  }

  function resetCalculator() {
    setHeight("");
    setWeight("");
    setBmi("");
    setError("");
  }

  return (
    <div className="bmi-calculator">
      <h3>BMI Calculator</h3>
      <p>Enter your height and weight to calculate your BMI.</p>

      <form onSubmit={calculateBmi}>
        <label htmlFor="bmi-height">Height in centimetres</label>
        <input
          id="bmi-height"
          type="number"
          min="1"
          step="any"
          placeholder="Example: 170"
          value={height}
          onChange={(event) => {
            setHeight(event.target.value);
            setBmi("");
            setError("");
          }}
          required
        />

        <label htmlFor="bmi-weight">Weight in kilograms</label>
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

      {error && <p role="alert">{error}</p>}

      {bmi && (
        <p className="bmi-result" role="status">
          Your BMI: <strong>{bmi}</strong>
        </p>
      )}

      <small>BMI is a general measure, not a medical diagnosis.</small>
    </div>
  );
}

export default BMICalculator;