import axios from 'axios';

const fetchRecipes = async (ingredients: string) => {
  try {
    const response = await axios.post('/external-recipes', { ingredients }); // API request to fetch recipes by ingredients
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
    const response = await axios.get(`/external-recipes-id/${recipeId}`); // API request to fetch recipe by recipe ID
    
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
    const response = await axios.get('/external-image'); // API request to fetch image
    console.log(response);
    const imageData = response.data;
    // Process the image data as needed
    console.log(imageData);
    return imageData;
  } catch (error: any) {
    console.error('Error fetching image:', error);
    return null; // Return null in case of an error
  }
};

export { fetchRecipes , fetchRecipeById , fetchImg };