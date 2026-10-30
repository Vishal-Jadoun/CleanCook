import { useState, useEffect } from 'react';
import { searchMeals, filterByCategory } from '../../services/mealDbService';
import { useDebounce } from '../../hooks/useDebounce';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import { SIGNATURE_BOWLS } from '../../data/signatureBowls';
import './Recipes.css';

const FEATURED_BOWLS = SIGNATURE_BOWLS;

const CATEGORIES = [
  'All', 'Chicken', 'Vegetarian', 'Pasta', 'Seafood', 'Dessert', 'Beef', 'Breakfast'
];

const ITEMS_PER_PAGE = 12;

function Recipes() {
  const [searchInput, setSearchInput] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  const debouncedSearch = useDebounce(searchInput, 400);

  useEffect(() => {
    let cancelled = false;

    async function fetchRecipeData() {
      setLoading(true);
      setError(null);

      try {
        let results = [];
        if (debouncedSearch.trim()) {
          results = await searchMeals(debouncedSearch.trim());
        } else if (activeCategory && activeCategory !== 'All') {
          results = await filterByCategory(activeCategory);
        } else {
          results = await searchMeals('chicken');
        }

        if (!cancelled) {
          setRecipes(results || []);
          setLoading(false);
          setPage(0);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to fetch recipes');
          setLoading(false);
        }
      }
    }

    fetchRecipeData();

    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, activeCategory]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setSearchInput('');
    setPage(0);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setActiveCategory('All');
    setPage(0);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setPage(0);
  };

  const totalPages = Math.ceil(recipes.length / ITEMS_PER_PAGE);
  const displayedRecipes = recipes.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  return (
    <section id="recipes-page" className="recipes-page">
      <div className="recipes-header">
        <div className="recipes-header-text">
          <h1 className="recipes-title">Explore Recipes</h1>
          <p className="recipes-subtitle">
            Discover {recipes.length > 0 ? recipes.length : '100+'} delicious recipes powered by TheMealDB API
          </p>
        </div>

        <SearchBar
          value={searchInput}
          onChange={handleSearchChange}
          onClear={handleClearSearch}
          placeholder="Search recipes (e.g. Chicken, Pasta, Curry)..."
        />
      </div>

      <div className="recipes-tag-filters" role="group" aria-label="Filter by category">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={`tag-filter-btn ${activeCategory === category ? 'tag-filter-btn--active' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {!debouncedSearch && activeCategory === 'All' && page === 0 && (
        <section className="featured-recipes-section" aria-label="Chef's Featured Bowls">
          <div className="featured-section-header">
            <h2 className="featured-section-title">🥗 Chef's Featured Bowls</h2>
            <p className="featured-section-subtitle">
              Nutrient-dense, wholesome bowl recipes handpicked for healthy eating
            </p>
          </div>
          <div className="featured-bowls-grid" role="list">
            {FEATURED_BOWLS.map((bowl) => (
              <RecipeCard key={bowl.id} recipe={bowl} />
            ))}
          </div>
        </section>
      )}

      {loading && (
        <div className="recipes-state-wrap">
          <div className="recipes-loader">
            <div className="loader-spinner" />
            <p>Fetching recipes from TheMealDB...</p>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="recipes-state-wrap">
          <div className="recipes-error">
            <span className="error-icon" aria-hidden="true">⚠️</span>
            <p>Could not load recipes: {error}</p>
            <button className="retry-btn" onClick={() => setActiveCategory((c) => c)}>Retry</button>
          </div>
        </div>
      )}

      {!loading && !error && recipes.length === 0 && (
        <div className="recipes-state-wrap">
          <div className="recipes-empty">
            <span className="empty-icon" aria-hidden="true">🍽️</span>
            <p>No recipes found{debouncedSearch ? ` for "${debouncedSearch}"` : ''}. Try another search!</p>
          </div>
        </div>
      )}

      {!loading && !error && recipes.length > 0 && (
        <>
          <p className="recipes-result-count">
            Showing <strong>{page * ITEMS_PER_PAGE + 1}–{Math.min((page + 1) * ITEMS_PER_PAGE, recipes.length)}</strong> of <strong>{recipes.length}</strong> recipes
          </p>

          <div className="recipes-grid" role="list">
            {displayedRecipes.map((meal) => (
              <RecipeCard key={meal.idMeal || meal.id} recipe={meal} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="recipes-pagination" role="navigation" aria-label="Recipe pages">
              <button
                className="page-btn"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                aria-label="Previous page"
              >
                ← Prev
              </button>

              <div className="page-numbers">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`page-num-btn ${page === i ? 'page-num-btn--active' : ''}`}
                    onClick={() => setPage(i)}
                    aria-label={`Page ${i + 1}`}
                    aria-current={page === i ? 'page' : undefined}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                className="page-btn"
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                aria-label="Next page"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Recipes;
