import './Recipes.css';
import SearchBar from '../../components/SearchBar/SearchBar';

import abgcbowl from "../../assets/abgcbowl.png";
import bbgcbowl from "../../assets/bbgcbowl.png";
import cbgcbowl from "../../assets/cbgcbowl.png";

function Recipes() {
  return (
    <section id="recipes-page" className="recipes-page">
      
      <div className='recipePage'>
        <h1>Discover Recipe</h1>
        <p>Find your next healthy meal to add to your planner</p>
        <SearchBar />
      </div>

      <div className='recipeContainer'>

        <div className='recipeCard'>
          <div className='recipeImg'><img src={abgcbowl} alt="Bowl" /></div>
          <div className='recipeInfo'>
            <h4>Rainbow Buddha Bowl</h4>
            <p>A colorful mix of avocado, quinoa, chickpeas, fresh greens, purple cabbage, cherry tomatoes, and roasted sweet potatoes.</p>
            <button className='addPlannerBtn'>Add to Planner</button>
          </div>
        </div>

        <div className='recipeCard'>
          <div className='recipeImg'><img src={bbgcbowl} alt="Bowl" /></div>
          <div className='recipeInfo'>
            <h4>Hearty Lentil & Sweet Potato Bowl</h4>
            <p>A warm and comforting bowl of protein-rich lentils, roasted sweet potatoes, spinach, and fresh herbs.</p>
            <button className='addPlannerBtn'>Add to Planner</button>
          </div>
        </div>

        <div className='recipeCard'>
          <div className='recipeImg'><img src={cbgcbowl} alt="Bowl" /></div>
          <div className='recipeInfo'>
            <h4>Mediterranean Kale Chickpea Bowl</h4>
            <p>Fresh kale and chickpeas tossed with cucumber, cherry tomatoes, red onion, creamy feta, and herbs.</p>
            <button className='addPlannerBtn'>Add to Planner</button>
          </div>
        </div>
      </div>

    </section>
  );
}

export default Recipes;
