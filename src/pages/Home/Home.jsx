import './Home.css';
import heroImg from "../../assets/hero.png";
import cal from "../../assets/calendar.png";
import chef from "../../assets/chef.png";
import chart from "../../assets/chart.png";
import target from "../../assets/target.png";
import bbowl from "../../assets/bbowl.png";
import cbowl from "../../assets/cbowl.png";
import xbowl from "../../assets/xbowl.png";
import ybowl from "../../assets/ybowl.png";
import zbowl from "../../assets/zbowl.png";


function Home() {
  return (
    <section id="home-page" className="home-page">
      {/* <h1>Home</h1> */}
      {/* <p>Coming soon — owned by Vishal</p> */}

        <div className='heroContainer'>
          <div className='heroTextPart'>
            <h1>Eat Clean, Cook Clean, Live Heealthy</h1>
            <p>Plan your nutritious meals, track your wellness journey, and find healthy recipes effortlessly with CleanCook</p>
          
            <button className='heroMainBtn'>
              Start Planning Now <span>→</span>
            </button>
          </div>

          <div className='heroImg'>
            <img src={heroImg} alt="Health Food" />
          </div>

        </div>

        <div className='featureBarWrap'>
            <div className='featureContainer'>

              <div className='featureCard'>
                <span className='featureIcon'><img src={cal} alt="calander" /></span>
                <h4>Meal Planning</h4>
                <p>Plan your nutritious meals for the week effortlessly</p>
              </div>
              <div className='featureCard'>
                <span className='featureIcon'><img src={chef} alt="calander" /></span>
                <h4>Recipe Discovery</h4>
                <p>Find new, healthy, and delicious recipes daily</p>
              </div>
              <div className='featureCard'>
                <span className='featureIcon'><img src={chart} alt="calander" /></span>
                <h4>Nutrition Tracking</h4>
                <p>Track your calories, protein, and daily water intak</p>
              </div>
              <div className='featureCard'>
                <span className='featureIcon'><img src={target} alt="calander" /></span>
                <h4>Wellness Goals</h4>
                <p>Set targets and hit your personal fitness goals</p>
              </div>
            </div>
          </div>

          <div className='recipeSection'>
            <h2>Daily Recipe Inspiration</h2>

            <div className='recipeContainer'>

              <div className='recipeCard'>
                <div className='recipeImg'>
                  <img src={heroImg} alt="Grilled Chicken" />
                </div>
                <div className='recipeInfo'>
                  <h4>Grilled Chiecken</h4>
                  <p>Fresh Greens, Avacodo, Chicken</p>
                  <button className='addPlannerBtn'>Add to Planner</button>
                </div>
              </div>

              <div className='recipeCard'>
                <div className='recipeImg'>
                  <img src={bbowl} alt="Quinoa Buddha Bowl" />
                </div>
                <div className='recipeInfo'>
                  <h4>Quinoa Buddha Bowl</h4>
                  <p>Quinoa, Chickpeas, Fresh Veggies</p>
                  <button className='addPlannerBtn'>Add to Planner</button>
                </div>
              </div>
              <div className='recipeCard'>
                <div className='recipeImg'>
                  <img src={xbowl} alt="Quinoa Buddha Bowl" />
                </div>
                <div className='recipeInfo'>
                  <h4>Tuna Bowl</h4>
                  <p>Fresh Tuna, Mango, Avocado</p>
                  <button className='addPlannerBtn'>Add to Planner</button>
                </div>
              </div>

                <div className='recipeCard'>
                <div className='recipeImg'>
                  <img src={cbowl} alt="Sweet Potato Hash" />
                </div>
                <div className='recipeInfo'>
                  <h4>Sweet Potato Hash</h4>
                  <p>Roasted Sweet Potato, Veggies, Herbs</p>
                  <button className='addPlannerBtn'>Add to Planner</button>
                </div>
              </div>

          </div>
        </div>


        <div className='dbSection'>
          <h2 className='sectionTitle'>Your Day at a Glance</h2>
          <div className='dbConatiner'>

            <div className='dbMealCard'>
              <div className='header'>

                <div className='dateInfo'>
                  <span className='dayTitle'>Today</span>
                  <span className='dayText'>Monday , Oct 17</span>
                </div>

                <div className='dateNav'>
                  <span className='arrow'>&lt;</span>
                  <span className='day'>Monday</span>
                  <span className='arrow'>&gt;</span>
                </div>
              </div>

              <div className='mealList'>
                <div className='mealItem'>
                  <div className='mealCircle'>
                    <img src={ybowl} alt="Breakfast" />
                  </div>
                  <h5>BreakFast</h5>
                  <p>Grilled Chicken Mediterranean Bowl</p>
                </div>
                <div className='mealItem'>
                  <div className='mealCircle'>
                    <img src={zbowl} alt="Lunch" />
                  </div>
                  <h5>Lunch</h5>
                  <p>Tuna Mango Poke Bowl</p>
                </div>
                <div className='mealItem'>
                  <div className='mealCircle'>
                    <img src={xbowl} alt="Dinner" />
                  </div>
                  <h5>Dinner</h5>
                  <p>Mediterranean Falafel Bowl</p>
                </div>

              </div>


            </div>
          </div>

        </div>

    </section>
  );
}

export default Home;
