import React, { useState } from 'react';
import './Profile.css';

function Profile() {
  //STATE
  // State to toggle between View mode and Edit mode
  const [isEditing, setIsEditing] = useState(false);

  // User Profile Data (Dummy Data for Eval 1)
  const [profileData, setProfileData] = useState({
    name: 'Aditya Jadoun',
    email: 'aditya@example.com',
    memberSince: 'August 2026',
    age: '21',
    height: '175',
    weight: '68',
    activityLevel: 'Moderate (3-4 days/week)',
    dailyCalories: '2000',
    waterGoal: '8',
    weightGoal: '65',
  });

  // Temporary state for editing so changes can be saved or cancelled
  const [formData, setFormData] = useState({ ...profileData });

  //HANDLERS
  // Handle input changes when in edit mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save updated info and exit edit mode
  const handleSave = (e) => {
    e.preventDefault();
    setProfileData({ ...formData });
    setIsEditing(false);
  };

  // Cancel edits and revert form data back to saved profile data
  const handleCancel = () => {
    setFormData({ ...profileData });
    setIsEditing(false);
  };

  return (
    <section id="profile-page" className="profile-page">
      <div className="profile-container">

        {/*PROFILE HEADER CARD*/}
        <div className="profile-header-card">
          <div className="profile-header-left">
            {/* Avatar Circle with Initial */}
            <div className="profile-avatar" id="profile-avatar">
              {profileData.name.charAt(0)}
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
                onClick={() => setIsEditing(true)}
              >
                ✏️ Edit Profile
              </button>
            ) : (
              <div className="edit-btn-group">
                <button
                  type="button"
                  id="btn-save-profile"
                  className="btn-save"
                  onClick={handleSave}
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

        {/* Form wrapper for editable fields */}
        <form onSubmit={handleSave}>

          {/* PERSONAL INFORMATION*/}
          <div className="profile-section-card">
            <div className="section-header">
              <h2>👤 Personal Information</h2>
              <p>Your personal details and physical measurements</p>
            </div>

            <div className="info-grid">
              {/* Full Name */}
              <div className="info-item">
                <label htmlFor="profile-name-input">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    id="profile-name-input"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  <p className="info-value">{profileData.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="info-item">
                <label htmlFor="profile-email-input">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    id="profile-email-input"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  <p className="info-value">{profileData.email}</p>
                )}
              </div>

              {/* Age */}
              <div className="info-item">
                <label htmlFor="profile-age-input">Age</label>
                {isEditing ? (
                  <input
                    type="number"
                    id="profile-age-input"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="info-value">{profileData.age} years</p>
                )}
              </div>

              {/* Height */}
              <div className="info-item">
                <label htmlFor="profile-height-input">Height (cm)</label>
                {isEditing ? (
                  <input
                    type="number"
                    id="profile-height-input"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="info-value">{profileData.height} cm</p>
                )}
              </div>

              {/* Weight */}
              <div className="info-item">
                <label htmlFor="profile-weight-input">Weight (kg)</label>
                {isEditing ? (
                  <input
                    type="number"
                    id="profile-weight-input"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="info-value">{profileData.weight} kg</p>
                )}
              </div>

              {/* Activity Level */}
              <div className="info-item">
                <label htmlFor="profile-activity-input">Activity Level</label>
                {isEditing ? (
                  <select
                    id="profile-activity-input"
                    name="activityLevel"
                    value={formData.activityLevel}
                    onChange={handleChange}
                  >
                    <option value="Sedentary (Little to no exercise)">Sedentary</option>
                    <option value="Light (1-2 days/week)">Light (1-2 days/week)</option>
                    <option value="Moderate (3-4 days/week)">Moderate (3-4 days/week)</option>
                    <option value="Very Active (5+ days/week)">Very Active (5+ days/week)</option>
                  </select>
                ) : (
                  <p className="info-value">{profileData.activityLevel}</p>
                )}
              </div>
            </div>
          </div>

          {/*HEALTH & NUTRITION GOALS*/}
          <div className="profile-section-card">
            <div className="section-header">
              <h2>🎯 Health & Nutrition Goals</h2>
              <p>Daily targets to stay fit and energized</p>
            </div>

            <div className="info-grid goals-grid">
              {/* Daily Calories */}
              <div className="info-item goal-item">
                <label htmlFor="profile-calories-input">🔥 Daily Calorie Target</label>
                {isEditing ? (
                  <input
                    type="number"
                    id="profile-calories-input"
                    name="dailyCalories"
                    value={formData.dailyCalories}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="info-value highlight-purple">{profileData.dailyCalories} kcal</p>
                )}
              </div>

              {/* Daily Water */}
              <div className="info-item goal-item">
                <label htmlFor="profile-water-input">💧 Daily Water Goal</label>
                {isEditing ? (
                  <input
                    type="number"
                    id="profile-water-input"
                    name="waterGoal"
                    value={formData.waterGoal}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="info-value highlight-teal">{profileData.waterGoal} glasses</p>
                )}
              </div>

              {/* Target Weight */}
              <div className="info-item goal-item">
                <label htmlFor="profile-weight-goal-input">⚖️ Target Weight</label>
                {isEditing ? (
                  <input
                    type="number"
                    id="profile-weight-goal-input"
                    name="weightGoal"
                    value={formData.weightGoal}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="info-value highlight-green">{profileData.weightGoal} kg</p>
                )}
              </div>
            </div>
          </div>

        </form>

        {/*ACCOUNT SETTINGS*/}
        <div className="profile-section-card settings-card">
          <div className="section-header">
            <h2>⚙️ Account Settings</h2>
            <p>Manage your account preferences and security</p>
          </div>

          <div className="settings-actions">
            <button
              type="button"
              id="btn-change-password"
              className="btn-setting btn-outline"
              onClick={() => alert('Change password modal/flow (Prototype)')}
            >
              🔒 Change Password
            </button>

            <button
              type="button"
              id="btn-logout"
              className="btn-setting btn-outline"
              onClick={() => alert('Logged out successfully (Prototype)')}
            >
              🚪 Log Out
            </button>

            <button
              type="button"
              id="btn-delete-account"
              className="btn-setting btn-danger"
              onClick={() => alert('Delete account confirmation (Prototype)')}
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
