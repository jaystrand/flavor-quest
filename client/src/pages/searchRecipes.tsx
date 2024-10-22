import React, {useEffect, useState } from 'react';
import { fetchRecipes } from '../api/API';

const SearchRecipes: React.FC = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState<any[]>([]); // State to store recipes
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{ username: string } | null>(null);

  // Retrieve user information from local storage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Only parse if the user is stored
      } else {
        console.error("User not found in localStorage");
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredients(e.target.value); // Update the ingredients as user types
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission lets see if this is needed 
    setError(null); // Clear previous errors

    try {
      const recipeResults = await fetchRecipes(ingredients); // Calling the fetchRecipes function 
      setRecipes(recipeResults); // Setting the fetched recipes in state
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
    }
  };

  return (
    <div className="search-recipes">
      <h1>Search Recipes by Ingredients</h1>
      {user && <h2>Welcome, {user.username}!</h2>}  {/* Display the logged-in username */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={ingredients}
          onChange={handleInputChange}
          placeholder="Enter ingredients, e.g., chicken, tomato"
        />
        <button type="submit">Search</button>
      </form>

      {error && <p>{error}</p>}

      <div className="recipe-results">
        {recipes.length > 0 ? (
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                <img src={recipe.image} alt={recipe.title} />
                <h2>{recipe.title}</h2>
                <p>Used Ingredients: {recipe.usedIngredientCount}</p>
                <p>Description : {recipe.description}</p>
                {/* <p>Missing Ingredients: {recipe.missedIngredientCount}</p> */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchRecipes;