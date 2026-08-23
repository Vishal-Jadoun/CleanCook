import './Home.css';
import heroImg from "../../assets/hero.png";
import cal from "../../assets/calendar.png";
import chef from "../../assets/chef.png";
import chart from "../../assets/chart.png";
import target from "../../assets/target.png";

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


    </section>
  );
}

export default Home;
