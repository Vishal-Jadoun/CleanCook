import './SearchBar.css';

function SearchBar({ value, onChange, onClear, placeholder = 'Search for recipes, ingredients...' }) {
  return (
    <div className="search-bar">
      <span className="search-icon" aria-hidden="true">🔍</span>
      <input
        type="text"
        placeholder={placeholder}
        className="searchInput"
        value={value}
        onChange={onChange}
      />
      {value && (
        <button type="button" className="search-clear-btn" onClick={onClear} aria-label="Clear search">
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
