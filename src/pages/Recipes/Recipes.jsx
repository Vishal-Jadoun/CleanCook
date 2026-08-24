import './Recipes.css';
import SearchBar from '../../components/SearchBar/SearchBar';
function Recipes() {
  return (
    <section id="recipes-page" className="recipes-page">
      <div>
        <SearchBar />
      </div>
      <h1>Recipes</h1>
      <p>Coming soon — owned by Vishal</p>
    </section>
  );
}

export default Recipes;
