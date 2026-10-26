import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../../hooks/useRecipes';
import { useDebounce } from '../../hooks/useDebounce';
import './Recipes.css';

// Local custom bowl images (Vishal's signature healthy bowl recipes)
import abgcbowl from '../../assets/abgcbowl.png';
import bbgcbowl from '../../assets/bbgcbowl.png';
import cbgcbowl from '../../assets/cbgcbowl.png';

const FEATURED_BOWLS = [
  {
    id: 'bowl-1',
    name: 'Rainbow Buddha Bowl',
    description: 'A colorful mix of avocado, quinoa, chickpeas, fresh greens, purple cabbage, cherry tomatoes, and roasted sweet potatoes.',
    image: abgcbowl,
    prepTime: '15 min',
    servings: '2',
    calories: '450 cal',
    tag: 'Signature Bowl',
    route: '/recipe/1',
  },
  {
    id: 'bowl-2',
    name: 'Hearty Lentil & Sweet Potato Bowl',
    description: 'A warm and comforting bowl of protein-rich lentils, roasted sweet potatoes, spinach, and fresh herbs.',
    image: bbgcbowl,
    prepTime: '25 min',
    servings: '2',
    calories: '520 cal',
    tag: 'Protein Rich',
    route: '/recipe/1',
  },
  {
    id: 'bowl-3',
    name: 'Mediterranean Kale Chickpea Bowl',
    description: 'Fresh kale and chickpeas tossed with cucumber, cherry tomatoes, red onion, creamy feta, and herbs.',
    image: cbgcbowl,
    prepTime: '20 min',
    servings: '2',
    calories: '480 cal',
    tag: 'Mediterranean',
    route: '/recipe/1',
  },
];

const CUISINE_TAGS = [
  'All', 'Italian', 'Asian', 'American', 'Mexican',
  'Mediterranean', 'Indian', 'Pakistani', 'Japanese', 'Thai'
];

const DIFFICULTY_COLORS = {
  Easy: '#22c55e',
  Medium: '#f59e0b',
  Hard: '#ef4444',
};

function StarRating({ rating }) {
  return (
    <span className="recipe-stars" aria-label={`Rating: ${rating}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= Math.round(rating) ? 'star--filled' : 'star--empty'}`}
        >
          ★
        </span>
      ))}
      <span className="recipe-rating-num">{rating.toFixed(1)}</span>
    </span>
  );
}

const RECIPES_PER_PAGE = 12;

function Recipes() {
  const [searchInput, setSearchInput] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [page, setPage] = useState(0);

  const debouncedSearch = useDebounce(searchInput, 400);

  const skip = page * RECIPES_PER_PAGE;

  const { recipes, total, loading, error } = useRecipes({
    limit: RECIPES_PER_PAGE,
    skip,
    search: debouncedSearch,
    tag: activeTag === 'All' ? '' : activeTag,
  });

  const totalPages = Math.ceil(total / RECIPES_PER_PAGE);

  const handleTagClick = (tag) => {
    setActiveTag(tag === 'All' ? '' : tag);
    setPage(0);
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    setPage(0);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setPage(0);
  };

  return (
    <section id="recipes-page" className="recipes-page">
      {/* Header */}
      <div className="recipes-header">
        <div className="recipes-header-text">
          <h1 className="recipes-title">Explore Recipes</h1>
          <p className="recipes-subtitle">
            Discover {total > 0 ? total : '50+'} delicious recipes from around the world
          </p>
        </div>

        {/* Dynamic Search Bar */}
        <div className="recipes-search-wrap">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            id="recipe-search-input"
            type="text"
            className="recipes-search-input"
            placeholder="Search recipes..."
            value={searchInput}
            onChange={handleSearch}
            aria-label="Search recipes"
          />
          {searchInput && (
            <button
              className="search-clear-btn"
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Cuisine Tag Filters */}
      <div className="recipes-tag-filters" role="group" aria-label="Filter by cuisine">
        {CUISINE_TAGS.map((tag) => (
          <button
            key={tag}
            id={`tag-filter-${tag.toLowerCase()}`}
            className={`tag-filter-btn ${(activeTag === tag || (tag === 'All' && !activeTag)) ? 'tag-filter-btn--active' : ''}`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Featured Signature Healthy Bowls (Integrated from Vishal's bowl recipes) */}
      {!debouncedSearch && (!activeTag || activeTag === 'All') && page === 0 && (
        <section className="featured-recipes-section" aria-label="Chef's Featured Bowls">
          <div className="featured-section-header">
            <h2 className="featured-section-title">🥗 Chef's Featured Bowls</h2>
            <p className="featured-section-subtitle">
              Nutrient-dense, wholesome bowl recipes handpicked for healthy eating
            </p>
          </div>
          <div className="featured-bowls-grid" role="list">
            {FEATURED_BOWLS.map((bowl) => (
              <div key={bowl.id} className="featured-bowl-card" role="listitem">
                <div className="featured-bowl-img-wrap">
                  <img src={bowl.image} alt={bowl.name} className="featured-bowl-img" />
                  <span className="featured-bowl-badge">{bowl.tag}</span>
                </div>
                <div className="featured-bowl-body">
                  <h3 className="featured-bowl-name">{bowl.name}</h3>
                  <p className="featured-bowl-desc">{bowl.description}</p>
                  <div className="featured-bowl-footer">
                    <span className="featured-bowl-meta">
                      ⏱️ {bowl.prepTime} • 🔥 {bowl.calories}
                    </span>
                    <Link
                      to={bowl.route}
                      className="featured-bowl-btn"
                      id={`featured-cook-${bowl.id}`}
                      aria-label={`Cook ${bowl.name}`}
                    >
                      Cook This Meal
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Loading State */}
      {loading && (
        <div className="recipes-state-wrap">
          <div className="recipes-loader">
            <div className="loader-spinner" />
            <p>Fetching recipes...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="recipes-state-wrap">
          <div className="recipes-error">
            <span className="error-icon" aria-hidden="true">⚠️</span>
            <p>Could not load recipes: {error}</p>
            <button className="retry-btn" onClick={() => setPage(0)}>Retry</button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && recipes.length === 0 && (
        <div className="recipes-state-wrap">
          <div className="recipes-empty">
            <span className="empty-icon" aria-hidden="true">🍽️</span>
            <p>No recipes found. Try a different search.</p>
          </div>
        </div>
      )}

      {/* Dynamic Recipe Grid */}
      {!loading && !error && recipes.length > 0 && (
        <>
          <p className="recipes-result-count">
            Showing <strong>{skip + 1}–{Math.min(skip + recipes.length, total)}</strong> of <strong>{total}</strong> recipes
          </p>
          <div className="recipes-grid" role="list">
            {recipes.map((recipe) => (
              <Link
                to={`/recipe/${recipe.id}`}
                key={recipe.id}
                className="recipe-card"
                role="listitem"
                id={`recipe-card-${recipe.id}`}
                aria-label={recipe.name}
              >
                <div className="recipe-card-img-wrap">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="recipe-card-img"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80';
                    }}
                  />
                  <div className="recipe-card-overlay">
                    <span className="recipe-card-cuisine">{recipe.cuisine}</span>
                    <span
                      className="recipe-card-difficulty"
                      style={{ color: DIFFICULTY_COLORS[recipe.difficulty] || '#fff' }}
                    >
                      {recipe.difficulty}
                    </span>
                  </div>
                  <div className="recipe-card-meal-type">
                    {(recipe.mealType || []).map((m) => (
                      <span key={m} className="meal-badge">{m}</span>
                    ))}
                  </div>
                </div>

                <div className="recipe-card-body">
                  <h2 className="recipe-card-name">{recipe.name}</h2>
                  <StarRating rating={recipe.rating} />

                  <div className="recipe-card-meta">
                    <span className="meta-item" title="Prep + Cook time">
                      ⏱️ {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
                    </span>
                    <span className="meta-item" title="Servings">
                      🍽️ {recipe.servings} servings
                    </span>
                    <span className="meta-item" title="Calories per serving">
                      🔥 {recipe.caloriesPerServing} cal
                    </span>
                  </div>

                  <div className="recipe-card-tags">
                    {(recipe.tags || []).slice(0, 3).map((tag) => (
                      <span key={tag} className="recipe-tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="recipes-pagination" role="navigation" aria-label="Recipe pages">
              <button
                id="pagination-prev"
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
                    id={`page-btn-${i + 1}`}
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
                id="pagination-next"
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
