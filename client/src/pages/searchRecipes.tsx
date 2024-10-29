import { fetchRecipes, fetchRecipeById } from "../api/API";
import React, { useEffect, useState } from 'react';

const SearchRecipes: React.FC = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState<any[]>([]); // State to store recipes
  const [error, setError] = useState<string | null>(null);
  const [recipeInstructions, setRecipeInstructions] = useState<{ [key: string]: any[] }>({}); // State to store recipe instructions by ID
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
    e.preventDefault(); // Prevent default form submission
    setError(null); // Clear previous errors

    try {
      const recipeResults = await fetchRecipes(ingredients); // Calling the fetchRecipes function
      setRecipes(recipeResults); // Setting the fetched recipes in state

      const recipeIds = recipeResults.map((recipe: { id: string }) => recipe.id); // Extracting recipe IDs

      if (recipeIds.length > 0) {
        const instructionsMap: { [key: string]: any[] } = {};
        await Promise.all(
          recipeIds.map(async (id: string) => {
            const recipeById = await fetchRecipeById(id); // Fetching each recipe by ID
            instructionsMap[id] = recipeById.analyzedInstructions; // Storing analyzedInstructions by recipe ID
          })
        );
        setRecipeInstructions(instructionsMap);
      } else {
        setError("No recipes found.");
      }
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
    }
  };

  return (
    <div className="search-recipes">
      <h1>Search Recipes by Ingredients</h1>
      {user && <h2>Welcome, {user.username}!</h2>} {/* Display the logged-in username */}
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
                <p>Missing Ingredients: </p>
                <ul>
                  {recipe.missedIngredients.map(
                    (missedIngredient: {
                      extendedName: string;
                      name: string;
                    }) => (
                      <li key={missedIngredient.extendedName}>
                        {missedIngredient.name}
                      </li>
                    )
                  )}
                </ul>
                <p>Instructions:</p>
                <ol>
                  {recipeInstructions[recipe.id] && recipeInstructions[recipe.id].length > 0 ? (
                    recipeInstructions[recipe.id][0]?.steps?.map((step: { step: string }, stepIndex: number) => (
                      <li key={stepIndex}>{step.step}</li>
                    ))
                  ) : (
                    <p>No instructions found.</p>
                  )}
                </ol>
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