import './Home.css';
import heroImg from "../../assets/hero.png";

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


    </section>
  );
}

export default Home;
