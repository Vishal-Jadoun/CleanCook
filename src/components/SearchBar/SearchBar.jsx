import './SearchBar.css';

function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search for recipes, ingredients..." className="searchInput"  />
      <button className='searchBtn'>Search</button>
    </div>
  );
}

export default SearchBar;
