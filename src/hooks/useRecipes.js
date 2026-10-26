import { useState, useEffect } from 'react';

const BASE_URL = 'https://dummyjson.com/recipes';

/**
 * Custom hook to fetch recipes from DummyJSON API.
 * Supports pagination, search by name, and filter by cuisine/tag.
 *
 * @param {Object} options
 * @param {number} options.limit  - how many recipes per page (default: 12)
 * @param {number} options.skip   - offset for pagination (default: 0)
 * @param {string} options.search - recipe name search query
 * @param {string} options.tag    - filter by tag (e.g. 'Vegetarian')
 */
export function useRecipes({ limit = 12, skip = 0, search = '', tag = '' } = {}) {
  const [recipes, setRecipes] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const buildUrl = () => {
      if (search.trim()) {
        // DummyJSON search endpoint
        return `${BASE_URL}/search?q=${encodeURIComponent(search.trim())}&limit=${limit}&skip=${skip}`;
      }
      if (tag.trim()) {
        // DummyJSON tag filter endpoint
        return `${BASE_URL}/tag/${encodeURIComponent(tag.trim())}?limit=${limit}&skip=${skip}`;
      }
      return `${BASE_URL}?limit=${limit}&skip=${skip}`;
    };

    fetch(buildUrl())
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setRecipes(data.recipes || []);
          setTotal(data.total || 0);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [limit, skip, search, tag]);

  return { recipes, total, loading, error };
}

export default useRecipes;
