import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  return (
    <section id="dashboard-page" className="dashboard-page">
      <div className="dashboard">

        <div className="dashboard-header">
          <div>
            <h1>
              Good morning, <span>Aditya!</span> 👋
            </h1>

            <p>Let's make today a healthy one.</p>
          </div>

          <Link to="/profile" className="dashboard-profile" style={{ textDecoration: 'none' }}>
            <div className="profile-circle">A</div>
            <span>⌄</span>
          </Link>
        </div>


     
        <div className="summary-cards">

  
          <div className="summary-card calories-card">

            <div className="summary-icon">
              🔥
            </div>

            <div className="summary-content">
              <h3>Calories Today</h3>

              <div className="summary-number">
                1,450
              </div>

              <p>/ 2,000 kcal</p>

              <div className="progress-bar">
                <div className="progress calories-progress"></div>
              </div>

              <span className="progress-text">72%</span>
            </div>

          </div>


 
          <div className="summary-card bmi-card">

            <div className="summary-icon">
              ⚖️
            </div>

            <div className="summary-content">

              <h3>BMI</h3>

              <div className="summary-number">
                22.5
              </div>

              <p className="bmi-normal">Normal</p>

              <div className="progress-bar">
                <div className="progress bmi-progress"></div>
              </div>

            </div>

          </div>



          <div className="summary-card water-card">

            <div className="summary-icon">
              💧
            </div>

            <div className="summary-content">

              <h3>Water Intake</h3>

              <div className="water-icons">
                <span>💧</span>
                <span>💧</span>
                <span>💧</span>
                <span>💧</span>
                <span className="empty-water">💧</span>
              </div>

              <p>4 / 8 glasses</p>

            </div>

          </div>

        </div>


       
        <section className="nutrition-section">

          <div className="section-title">
            <h2>Today's Nutrition</h2>

            <a href="#">
              View Details
            </a>
          </div>


          <div className="nutrition-container">

     
            <div className="nutrition-item">

              <div className="nutrition-icon protein-icon">
                🍗
              </div>

              <div className="nutrition-details">

                <h3>Protein</h3>

                <p>
                  <strong>85g</strong> / 120g
                </p>

                <div className="nutrition-progress">
                  <div className="protein-bar"></div>
                </div>

              </div>

              <span className="nutrition-percent">
                71%
              </span>

            </div>


   
            <div className="nutrition-item">

              <div className="nutrition-icon carbs-icon">
                🍞
              </div>

              <div className="nutrition-details">

                <h3>Carbs</h3>

                <p>
                  <strong>180g</strong> / 250g
                </p>

                <div className="nutrition-progress">
                  <div className="carbs-bar"></div>
                </div>

              </div>

              <span className="nutrition-percent">
                72%
              </span>

            </div>



            <div className="nutrition-item">

              <div className="nutrition-icon fat-icon">
                🥑
              </div>

              <div className="nutrition-details">

                <h3>Fat</h3>

                <p>
                  <strong>45g</strong> / 65g
                </p>

                <div className="nutrition-progress">
                  <div className="fat-bar"></div>
                </div>

              </div>

              <span className="nutrition-percent">
                69%
              </span>

            </div>

          </div>

        </section>


        {/* ================= BOTTOM SECTION ================= */}
        <div className="bottom-section">

          {/* Favorites */}
          <section className="favorites-section">

            <div className="section-title">
              <h2>Your Favorites</h2>

              <a href="#">
                View All
              </a>
            </div>


            <div className="favorite-items">

              <div className="favorite-card">

                <div className="food-placeholder">
                  🥗
                </div>

                <div className="favorite-info">
                  <h3>Paneer Salad</h3>
                  <span>♡</span>
                </div>

              </div>


              <div className="favorite-card">

                <div className="food-placeholder">
                  🥣
                </div>

                <div className="favorite-info">
                  <h3>Oats & Berries</h3>
                  <span>♡</span>
                </div>

              </div>


              <div className="favorite-card">

                <div className="food-placeholder">
                  🥞
                </div>

                <div className="favorite-info">
                  <h3>Masala Dosa</h3>
                  <span>♡</span>
                </div>

              </div>


              <div className="favorite-card">

                <div className="food-placeholder">
                  🥑
                </div>

                <div className="favorite-info">
                  <h3>Veg Bowl</h3>
                  <span>♡</span>
                </div>

              </div>

            </div>

          </section>


          {/* Recent Activity */}
          <section className="activity-section">

            <div className="section-title">

              <h2>Recent Activity</h2>

              <a href="#">
                View All
              </a>

            </div>


            <div className="activity-item">

              <div className="activity-icon purple">
                ♡
              </div>

              <div className="activity-content">
                <p>Added Butter Chicken to favorites</p>
                <span>2 hours ago</span>
              </div>

            </div>


            <div className="activity-item">

              <div className="activity-icon green">
                ✓
              </div>

              <div className="activity-content">
                <p>Planned meals for Monday</p>
                <span>Yesterday</span>
              </div>

            </div>


            <div className="activity-item">

              <div className="activity-icon blue">
                ◉
              </div>

              <div className="activity-content">
                <p>Updated calorie goal to 2,000 kcal</p>
                <span>3 days ago</span>
              </div>

            </div>

          </section>

        </div>

      </div>
    </section>
  );
}

export default Dashboard;
