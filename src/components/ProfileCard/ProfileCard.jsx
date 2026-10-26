import './ProfileCard.css';

function ProfileCard() {
  return (
        <div className="profile-card">
      {/* 1. Header: Avatar + User Info + Pro Badge */}
      <div className="profile-card-header">
        <div className="profile-avatar-wrapper">
          <div className="profile-card-avatar">A</div>
          <span className="status-dot" title="Active"></span>
        </div>

        <div className="profile-card-details">
          <div className="profile-name-row">
            <h3 className="profile-card-name">Aditya Jadoun</h3>
            <span className="pro-badge">⚡ Pro</span>
          </div>
          <p className="profile-card-email">aditya@example.com</p>
          <span className="profile-card-joined">Member since August 2026</span>
        </div>
      </div>

      {/* 2. Quick Health Goals Summary */}
      <div className="profile-card-stats">
        <div className="stat-item">
          <span className="stat-icon">🔥</span>
          <span className="stat-label">Calorie Goal</span>
          <strong className="stat-value">2,000 <small>kcal</small></strong>
        </div>

        <div className="stat-item">
          <span className="stat-icon">⚖️</span>
          <span className="stat-label">Target Weight</span>
          <strong className="stat-value">65 <small>kg</small></strong>
        </div>

        <div className="stat-item">
          <span className="stat-icon">💧</span>
          <span className="stat-label">Water Goal</span>
          <strong className="stat-value">8 <small>glasses</small></strong>
        </div>
      </div>

      {/* 3. Action Buttons */}
      <div className="profile-card-actions">
        <button type="button" className="btn-full-profile">
          View Full Profile
        </button>
        <button type="button" className="btn-edit-goals" title="Edit Profile">
          ⚙️
        </button>
      </div>
    </div>

  );
}

export default ProfileCard;
