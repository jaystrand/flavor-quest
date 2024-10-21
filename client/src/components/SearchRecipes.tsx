import React, { useState } from 'react';
import RecipeList from './RecipeList';
import LoadingSpinner from './LoadingSpinner';
import Error from './Error';

interface Recipe {
  name: string;
  description: string;
}

const SearchRecipes: React.FC = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredients(e.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://api.example.com/recipes?ingredients=${ingredients}`);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      setError('Error fetching recipes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={ingredients}
        onChange={handleInputChange}
        placeholder="Enter ingredients"
      />
      <button onClick={handleSearch}>Search</button>
      {loading && <LoadingSpinner />}
      {error && <Error message={error} />}
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default SearchRecipes;