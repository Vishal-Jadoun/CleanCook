import './RecipeDetails.css';
import abgcbowl from "../../assets/abgcbowl.png";

function RecipeDetails() {
  return (
    <section className="recipeDetailsPage">
      

      <div className="detailsHeader">
        <div className="detailsImage">
          <img src={abgcbowl} alt="Rainbow Buddha Bowl" />
        </div>
        <div className="detailsTitleBox">
          <h1>Rainbow Buddha Bowl</h1>
          <p>A colorful mix of avocado, quinoa, chickpeas, fresh greens, purple cabbage, cherry tomatoes, and roasted sweet potatoes.</p>
          
          <div className="recipeStats">
            <span>🕒 15 Mins</span>
            <span>👥 2 Servings</span>
            <span>🔥 450 Calories</span>
          </div>
          <button className="addPlannerBtn">Add to Planner</button>
        </div>
      </div>

      <div className="detailsContent">
        

        <div className="ingredientsSection">
          <h2>Ingredients</h2>
          <ul>
            <li>✓ 1 cup Quinoa</li>
            <li>✓ 1/2 cup Chickpeas</li>
            <li>✓ 1 Fresh Avocado</li>
            <li>✓ Purple Cabbage</li>
            <li>✓ Cherry Tomatoes</li>
            <li>✓ Roasted Sweet Potatoes</li>
            <li>✓ Lemon Tahini Dressing</li>
          </ul>
        </div>

        <div className="instructionsSection">
          <h2>Instructions</h2>
          <ol>
            <li><strong>Cook the Quinoa:</strong> Rinse quinoa and boil in 2 cups of water for 15 minutes until fluffy.</li>
            <li><strong>Prepare the Veggies:</strong> Chop the avocado, cabbage, and tomatoes. Roast the sweet potatoes until soft.</li>
            <li><strong>Assemble the Bowl:</strong> Place the cooked quinoa at the bottom. Arrange all the veggies and chickpeas neatly on top.</li>
            <li><strong>Dressing:</strong> Drizzle heavily with lemon tahini dressing and serve immediately.</li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default RecipeDetails;
