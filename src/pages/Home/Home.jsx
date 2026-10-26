import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import heroImg from '../../assets/hero.png';
import cal from '../../assets/calendar.png';
import chef from '../../assets/chef.png';
import chart from '../../assets/chart.png';
import target from '../../assets/target.png';
import bbowl from '../../assets/bbowl.png';
import cbowl from '../../assets/cbowl.png';
import xbowl from '../../assets/xbowl.png';
import ybowl from '../../assets/ybowl.png';
import zbowl from '../../assets/zbowl.png';

const DAYS_SCHEDULE = [
  {
    day: 'Monday',
    subtitle: 'Monday, Planned Meals',
    meals: [
      { type: 'Breakfast', name: 'Grilled Chicken Mediterranean Bowl', image: ybowl },
      { type: 'Lunch', name: 'Tuna Mango Poke Bowl', image: zbowl },
      { type: 'Dinner', name: 'Mediterranean Falafel Bowl', image: xbowl },
    ],
  },
  {
    day: 'Tuesday',
    subtitle: 'Tuesday, Planned Meals',
    meals: [
      { type: 'Breakfast', name: 'Quinoa Berry Power Bowl', image: bbowl },
      { type: 'Lunch', name: 'Sweet Potato Avocado Crunch', image: cbowl },
      { type: 'Dinner', name: 'Grilled Salmon Superfood Bowl', image: heroImg },
    ],
  },
  {
    day: 'Wednesday',
    subtitle: 'Wednesday, Planned Meals',
    meals: [
      { type: 'Breakfast', name: 'Chia Green Vitality Bowl', image: zbowl },
      { type: 'Lunch', name: 'Spiced Lentil Kale Salad', image: ybowl },
      { type: 'Dinner', name: 'Roasted Veggie Tahini Bowl', image: xbowl },
    ],
  },
  {
    day: 'Thursday',
    subtitle: 'Thursday, Planned Meals',
    meals: [
      { type: 'Breakfast', name: 'Avocado Poached Egg Bowl', image: heroImg },
      { type: 'Lunch', name: 'Lemon Herb Chickpea Bowl', image: bbowl },
      { type: 'Dinner', name: 'Sesame Ginger Tofu Bowl', image: cbowl },
    ],
  },
  {
    day: 'Friday',
    subtitle: 'Friday, Planned Meals',
    meals: [
      { type: 'Breakfast', name: 'Greek Yogurt Crunch Bowl', image: xbowl },
      { type: 'Lunch', name: 'Rainbow Buddha Bowl', image: ybowl },
      { type: 'Dinner', name: 'Warm Grain & Herb Bowl', image: zbowl },
    ],
  },
  {
    day: 'Saturday',
    subtitle: 'Saturday, Planned Meals',
    meals: [
      { type: 'Breakfast', name: 'Protein Berry Boost Bowl', image: cbowl },
      { type: 'Lunch', name: 'Smoked Salmon Citrus Bowl', image: heroImg },
      { type: 'Dinner', name: 'Garden Harvest Green Bowl', image: bbowl },
    ],
  },
  {
    day: 'Sunday',
    subtitle: 'Sunday, Planned Meals',
    meals: [
      { type: 'Breakfast', name: 'Overnight Oats Supreme Bowl', image: zbowl },
      { type: 'Lunch', name: 'Golden Roasted Vegetable Bowl', image: xbowl },
      { type: 'Dinner', name: 'Mediterranean Herb Bowl', image: ybowl },
    ],
  },
];

function Home() {
  const [dayIndex, setDayIndex] = useState(0);

  const handlePrevDay = () => {
    setDayIndex((prev) => (prev === 0 ? DAYS_SCHEDULE.length - 1 : prev - 1));
  };

  const handleNextDay = () => {
    setDayIndex((prev) => (prev === DAYS_SCHEDULE.length - 1 ? 0 : prev + 1));
  };

  const currentSchedule = DAYS_SCHEDULE[dayIndex];

  return (
    <section id="home-page" className="home-page">
      {/* Hero Section */}
      <div className="heroContainer">
        <div className="heroTextPart">
          <h1 className="heroTitle">Eat Clean, Cook Clean, Live Healthy</h1>
          <p className="heroSubtitle">
            Plan your nutritious meals, track your wellness journey, and find healthy recipes effortlessly with CleanCook.
          </p>

          <Link to="/planner" className="heroMainBtn">
            Start Planning Now <span>→</span>
          </Link>
        </div>

        <div className="heroImg">
          <img src={heroImg} alt="Healthy Food Bowl" />
        </div>
      </div>

      {/* Feature Cards Row */}
      <div className="featureBarWrap">
        <div className="featureContainer">
          <div className="featureCard">
            <span className="featureIcon"><img src={cal} alt="Calendar" /></span>
            <h4>Meal Planning</h4>
            <p>Plan your nutritious meals for the week effortlessly</p>
          </div>
          <div className="featureCard">
            <span className="featureIcon"><img src={chef} alt="Chef" /></span>
            <h4>Recipe Discovery</h4>
            <p>Find new, healthy, and delicious recipes daily</p>
          </div>
          <div className="featureCard">
            <span className="featureIcon"><img src={chart} alt="Chart" /></span>
            <h4>Nutrition Tracking</h4>
            <p>Track your calories, protein, and daily water intake</p>
          </div>
          <div className="featureCard">
            <span className="featureIcon"><img src={target} alt="Target" /></span>
            <h4>Wellness Goals</h4>
            <p>Set targets and hit your personal fitness goals</p>
          </div>
        </div>
      </div>

      {/* Recipe Inspiration Section */}
      <div className="recipeSection">
        <h2 className="sectionTitle">Daily Recipe Inspiration</h2>

        <div className="recipeContainer">
          <div className="recipeCard">
            <div className="recipeImg">
              <img src={heroImg} alt="Grilled Chicken" />
            </div>
            <div className="recipeInfo">
              <h4>Grilled Chicken</h4>
              <p>Fresh Greens, Avocado, Chicken</p>
              <Link to="/recipes" className="addPlannerBtn">View Recipe</Link>
            </div>
          </div>

          <div className="recipeCard">
            <div className="recipeImg">
              <img src={bbowl} alt="Quinoa Buddha Bowl" />
            </div>
            <div className="recipeInfo">
              <h4>Quinoa Buddha Bowl</h4>
              <p>Quinoa, Chickpeas, Fresh Veggies</p>
              <Link to="/recipes" className="addPlannerBtn">View Recipe</Link>
            </div>
          </div>

          <div className="recipeCard">
            <div className="recipeImg">
              <img src={xbowl} alt="Tuna Bowl" />
            </div>
            <div className="recipeInfo">
              <h4>Tuna Bowl</h4>
              <p>Fresh Tuna, Mango, Avocado</p>
              <Link to="/recipes" className="addPlannerBtn">View Recipe</Link>
            </div>
          </div>

          <div className="recipeCard">
            <div className="recipeImg">
              <img src={cbowl} alt="Sweet Potato Hash" />
            </div>
            <div className="recipeInfo">
              <h4>Sweet Potato Hash</h4>
              <p>Roasted Sweet Potato, Veggies, Herbs</p>
              <Link to="/recipes" className="addPlannerBtn">View Recipe</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Day at a Glance Dashboard Section */}
      <div className="dbSection">
        <h2 className="sectionTitle">Your Day at a Glance</h2>
        <div className="dbContainer">
          <div className="dbMealCard">
            <div className="header">
              <div className="dateInfo">
                <span className="dayTitle">Today's Schedule</span>
                <span className="dayText">{currentSchedule.subtitle}</span>
              </div>

              <div className="dateNav" role="group" aria-label="Cycle schedule days">
                <button
                  type="button"
                  className="dayNavBtn"
                  onClick={handlePrevDay}
                  aria-label="Previous day"
                >
                  ‹
                </button>
                <span className="day">{currentSchedule.day}</span>
                <button
                  type="button"
                  className="dayNavBtn"
                  onClick={handleNextDay}
                  aria-label="Next day"
                >
                  ›
                </button>
              </div>
            </div>

            <div className="mealList">
              {currentSchedule.meals.map((meal) => (
                <div key={meal.type} className="mealItem">
                  <div className="mealCircle">
                    <img src={meal.image} alt={meal.type} />
                  </div>
                  <h5>{meal.type}</h5>
                  <p>{meal.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
