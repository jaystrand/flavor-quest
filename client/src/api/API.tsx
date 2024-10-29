const fetchRecipes = async (ingredients: string) => {
  try {
    console.log(ingredients);
    const response = await fetch("/api/external-recipes/external-recipes", {
      method: "POST",
      body: JSON.stringify({ ingredients }),
      headers: {
        "Content-Type": "application/json",
      },
    }); // API request to fetch recipes by ingredients
    const recipeData = await response.json(); // Extract recipe data
    // Process the recipe data as needed
    console.log(recipeData);
    return recipeData;
  } catch (error: any) {
    console.error("Error fetching recipes:", error);
  }
};

// uncomment this function if we include a way to fetch recipe by ID

const fetchRecipeById = async (recipeId: string) => {
  try {
    const response = await fetch(
      "/api/external-recipes-id/external-recipes-id/",
      {
        method: "POST",
        body: JSON.stringify({ recipeId }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ); // API request to fetch recipe by recipe ID

    const recipeID = await response.json();
    // Process the recipe data as needed
    console.log(recipeID);
    return recipeID;
  } catch (error: any) {
    console.error("Error fetching recipe by ID:", error);
  }
};

const fetchImg = async (): Promise<any> => {
  try {
    const response = await fetch("/api/external-image/external-image"); // API request to fetch image

    const imageData = await response.json(); // Extract image data
    // Process the image data as needed
    return imageData;
  } catch (error: any) {
    console.error("Error fetching image:", error);
    return console.log(error); // Return null in case of an error
  }
};

export { fetchRecipes, fetchRecipeById, fetchImg };
