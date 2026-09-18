import { createContext, useContext, useEffect, useState } from 'react';

export const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({ type: null, value: null });

  // Load saved recipes from local storage
  const [saved, setSaved] = useState(() => {
    const stored = localStorage.getItem('savedRecipes');
    return stored ? JSON.parse(stored) : [];
  });

  // Fetch recipes from API
  useEffect(() => {
    fetch('https://dummyjson.com/recipes')
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipes);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch recipes", err);
        setLoading(false);
      });
  }, []);

  // Save to local storage whenever 'saved' changes
  useEffect(() => {
    localStorage.setItem('savedRecipes', JSON.stringify(saved));
  }, [saved]);

  const toggleSave = (recipe) => {
    const exists = saved.find((item) => item.id === recipe.id);
    if (exists) {
      setSaved(saved.filter((item) => item.id !== recipe.id));
    } else {
      setSaved([...saved, recipe]);
      alert('Saved successfully!');
    }
  };

  const isSaved = (id) => saved.some((item) => item.id === id);

  const removeSaved = (id) => {
    setSaved(saved.filter((item) => item.id !== id));
  };

  // Filter recipes based on search and category
  const filteredRecipes = recipes.filter((recipe) => {
    // Search filter
    if (search && !recipe.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }

    // Category filter
    if (filter.type && filter.value) {
      if (filter.type === 'difficulty' && recipe.difficulty.toLowerCase() !== filter.value.toLowerCase()) return false;
      if (filter.type === 'cuisine' && recipe.cuisine.toLowerCase() !== filter.value.toLowerCase()) return false;
      if (filter.type === 'mealType' && !recipe.mealType.some(m => m.toLowerCase() === filter.value.toLowerCase())) return false;
    }

    return true;
  });

  return (
    <RecipeContext.Provider value={{
      recipes, loading, search, setSearch, filter, setFilter,
      saved, toggleSave, isSaved, removeSaved, filteredRecipes
    }}>
      {children}
    </RecipeContext.Provider>
  );
}