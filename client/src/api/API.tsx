import axios from 'axios';

const fetchRecipes = async (ingredients: string) => {
  try {
    const response = await axios.post('/api/external-recipes/external-recipes', { ingredients }); // API request to fetch recipes by ingredients
    const recipeData = response.data;
    // Process the recipe data as needed
    console.log(recipeData);
    return JSON.parse(recipeData);
  } catch (error: any) {
    console.error('Error fetching recipes:', error);
  }
};


// uncomment this function if we include a way to fetch recipe by ID

const fetchRecipeById = async (recipeId: string) => {
  try {
    const response = await axios.get(`/api/external-recipes-id/external-recipes-id/${recipeId}`); // API request to fetch recipe by recipe ID
    
    const recipeID = response.data;
    // Process the recipe data as needed
    console.log(recipeID);
    return JSON.parse(recipeID);
  } catch (error: any) {
    console.error('Error fetching recipe by ID:', error);
  }
};

const fetchImg = async (): Promise<any> => {
  try {
    const response = await fetch('/api/external-image/external-image'); // API request to fetch image

    const imageData = await response.json(); // Extract image data
    // Process the image data as needed
    return imageData;
  } catch (error: any) {
    console.error('Error fetching image:', error);
    return console.log(error); // Return null in case of an error
  }
};

export { fetchRecipes , fetchRecipeById , fetchImg };