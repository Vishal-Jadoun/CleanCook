import { useState } from "react";
import "./Profile.css";

const STORAGE_KEY = "cleancook-profile";

const defaultProfile = {
  name: "Aditya Bansal",
  email: "aditya@example.com",
  memberSince: "August 2026",
  age: "21",
  height: "175",
  weight: "68",
  activityLevel: "Moderate (3-4 days/week)",
  dailyCalories: "2000",
  waterGoal: "8",
  weightGoal: "65",
};

// Read previously saved details when the page opens.
function loadProfile() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === null) {
      return { ...defaultProfile };
    }

    const data = JSON.parse(saved);
    const profile = { ...defaultProfile };

    // Only load recognised fields containing text.
    for (const key of Object.keys(defaultProfile)) {
      if (data !== null && typeof data[key] === "string") {
        profile[key] = data[key];
      }
    }

    return profile;
  } catch {
    return { ...defaultProfile };
  }
}

// These arrays describe the fields displayed in the form.
const personalFields = [
  { name: "name", label: "Full Name", type: "text", unit: "" },
  { name: "email", label: "Email Address", type: "email", unit: "" },
  { name: "age", label: "Age", type: "number", unit: "years" },
  { name: "height", label: "Height (cm)", type: "number", unit: "cm" },
  { name: "weight", label: "Weight (kg)", type: "number", unit: "kg" },
];

const goalFields = [
  {
    name: "dailyCalories",
    label: "🔥 Daily Calorie Target",
    unit: "kcal",
    color: "highlight-purple",
  },
  {
    name: "waterGoal",
    label: "💧 Daily Water Goal",
    unit: "glasses",
    color: "highlight-teal",
  },
  {
    name: "weightGoal",
    label: "⚖️ Target Weight",
    unit: "kg",
    color: "highlight-green",
  },
];

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(loadProfile);
  const [formData, setFormData] = useState({ ...profileData });
  const [message, setMessage] = useState("");

  function handleEdit() {
    setFormData({ ...profileData });
    setMessage("");
    setIsEditing(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();

    if (!isEditing) {
      return;
    }

    if (formData.name.trim() === "") {
      setMessage("Please enter your name.");
      return;
    }

    const updatedProfile = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
    };

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedProfile)
      );

      setProfileData(updatedProfile);
      setFormData({ ...updatedProfile });
      setIsEditing(false);
      setMessage("Profile saved in this browser.");
    } catch {
      setMessage(
        "Your browser could not save the profile. Your edits are still here."
      );
    }
  }

  function handleCancel() {
    setFormData({ ...profileData });
    setIsEditing(false);
    setMessage("");
  }

  return (
    <section id="profile-page" className="profile-page">
      <div className="profile-container">
        <div className="profile-header-card">
          <div className="profile-header-left">
            <div className="profile-avatar" id="profile-avatar">
              {profileData.name.charAt(0).toUpperCase()}
            </div>

            <div className="profile-header-info">
              <h1 id="profile-name-display">{profileData.name}</h1>
              <p className="profile-email">{profileData.email}</p>

              <span className="profile-badge">
                📅 Member since {profileData.memberSince}
              </span>
            </div>
          </div>

          <div className="profile-header-actions">
            {!isEditing ? (
              <button
                type="button"
                id="btn-edit-profile"
                className="btn-edit"
                onClick={handleEdit}
              >
                ✏️ Edit Profile
              </button>
            ) : (
              <div className="edit-btn-group">
                <button
                  type="submit"
                  form="profile-form"
                  id="btn-save-profile"
                  className="btn-save"
                >
                  ✓ Save
                </button>

                <button
                  type="button"
                  id="btn-cancel-profile"
                  className="btn-cancel"
                  onClick={handleCancel}
                >
                  ✕ Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {message && <p role="status">{message}</p>}

        <form id="profile-form" onSubmit={handleSave}>
          <div className="profile-section-card">
            <div className="section-header">
              <h2>👤 Personal Information</h2>
              <p>Your personal details and physical measurements</p>
            </div>

            <div className="info-grid">
              {personalFields.map((field) => (
                <div className="info-item" key={field.name}>
                  <label htmlFor={`profile-${field.name}`}>
                    {field.label}
                  </label>

                  {isEditing ? (
                    <input
                      id={`profile-${field.name}`}
                      name={field.name}
                      type={field.type}
                      value={formData[field.name]}
                      onChange={handleChange}
                      min={field.type === "number" ? "1" : undefined}
                      step={field.name === "age" ? "1" : "any"}
                      required
                    />
                  ) : (
                    <p className="info-value">
                      {profileData[field.name]} {field.unit}
                    </p>
                  )}
                </div>
              ))}

              <div className="info-item">
                <label htmlFor="profile-activity">Activity Level</label>

                {isEditing ? (
                  <select
                    id="profile-activity"
                    name="activityLevel"
                    value={formData.activityLevel}
                    onChange={handleChange}
                  >
                    <option value="Sedentary (Little to no exercise)">
                      Sedentary
                    </option>
                    <option value="Light (1-2 days/week)">
                      Light (1-2 days/week)
                    </option>
                    <option value="Moderate (3-4 days/week)">
                      Moderate (3-4 days/week)
                    </option>
                    <option value="Very Active (5+ days/week)">
                      Very Active (5+ days/week)
                    </option>
                  </select>
                ) : (
                  <p className="info-value">
                    {profileData.activityLevel}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="profile-section-card">
            <div className="section-header">
              <h2>🎯 Health & Nutrition Goals</h2>
              <p>Your personal daily targets</p>
            </div>

            <div className="info-grid goals-grid">
              {goalFields.map((field) => (
                <div
                  className="info-item goal-item"
                  key={field.name}
                >
                  <label htmlFor={`profile-${field.name}`}>
                    {field.label}
                  </label>

                  {isEditing ? (
                    <input
                      id={`profile-${field.name}`}
                      type="number"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      min="1"
                      step={field.name === "weightGoal" ? "any" : "1"}
                      required
                    />
                  ) : (
                    <p className={`info-value ${field.color}`}>
                      {profileData[field.name]} {field.unit}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </form>

        <div className="profile-section-card settings-card">
          <div className="section-header">
            <h2>⚙️ Account Settings</h2>
            <p>Account actions are placeholders in this demo.</p>
          </div>

          <div className="settings-actions">
            <button
              type="button"
              id="btn-change-password"
              className="btn-setting btn-outline"
              onClick={() =>
                setMessage("Password changes need backend authentication.")
              }
            >
              🔒 Change Password
            </button>

            <button
              type="button"
              id="btn-logout"
              className="btn-setting btn-outline"
              onClick={() =>
                setMessage("This demo has no authenticated login session.")
              }
            >
              🚪 Log Out
            </button>

            <button
              type="button"
              id="btn-delete-account"
              className="btn-setting btn-danger"
              onClick={() =>
                setMessage("Account deletion is not connected in this demo.")
              }
            >
              🗑️ Delete Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;