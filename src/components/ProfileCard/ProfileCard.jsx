import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProfileCard.css';

const defaultProfile = {
  name: 'Aditya Bansal',
  email: 'aditya@example.com',
  memberSince: 'August 2026',
  height: '175',
  weight: '68',
  dailyCalories: '2000',
};

function loadProfileData() {
  try {
    const saved = localStorage.getItem('cleancook-profile');
    if (!saved) return defaultProfile;
    const parsed = JSON.parse(saved);
    return { ...defaultProfile, ...parsed };
  } catch {
    return defaultProfile;
  }
}

function ProfileCard({ profile: profileProp }) {
  const [profile, setProfile] = useState(profileProp || loadProfileData);

  useEffect(() => {
    if (profileProp) {
      setProfile(profileProp);
      return;
    }
    const handleStorage = (e) => {
      if (e.key === 'cleancook-profile') {
        setProfile(loadProfileData());
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [profileProp]);

  const initial = (profile.name || 'A').charAt(0).toUpperCase();

  return (
    <article className="profile-card">
      <div className="profile-card-header">
        <div className="profile-card-avatar" aria-hidden="true">
          {initial}
        </div>
        <div className="profile-card-meta">
          <h3>{profile.name}</h3>
          <p className="profile-card-email">{profile.email}</p>
        </div>
      </div>

      <div className="profile-card-stats">
        <div className="stat-pill">
          <span className="stat-label">Height</span>
          <span className="stat-val">{profile.height} cm</span>
        </div>
        <div className="stat-pill">
          <span className="stat-label">Weight</span>
          <span className="stat-val">{profile.weight} kg</span>
        </div>
        <div className="stat-pill">
          <span className="stat-label">Goal</span>
          <span className="stat-val">{profile.dailyCalories} kcal</span>
        </div>
      </div>

      <Link to="/profile" className="profile-card-link">
        Edit Health Profile →
      </Link>
    </article>
  );
}

export default ProfileCard;
