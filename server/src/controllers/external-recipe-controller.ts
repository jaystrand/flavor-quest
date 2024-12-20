import axios from 'axios';
import { Response, Request } from 'express';

interface ReqExternalRecipesDTO {
    ingredients: string[];
}

const getExternalRecipes = async (req: Request<{},{},ReqExternalRecipesDTO>, res: Response) => {
    const api_key = process.env.REACT_APP_SPOONACULAR_API_KEY;
    const ingredients = req.body;
    try {
        if (!api_key) {
            throw new Error('Spoonacular API key is not defined');
        }
        if (!ingredients) {
            return res.json({ message: 'No recipes found' });
        }
        // API request to fetch recipes by ingredients

        
    const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.ingredients}&number=10&instructionsRequired=true&ignorePantry=true&apiKey=${api_key}`,
      );
      console.log(response.data);
      // return recipe data
      return res.json(response.data);
    } catch (error: any) {
      // log error to console
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
}

const getExternalRecipeById = async (req: Request, res: Response) => {
    const api_key = process.env.REACT_APP_SPOONACULAR_API_KEY;
    const recipeId = req.body;
    try {
        if (!api_key) {
            throw new Error('Spoonacular API key is not defined');
        }
        if (!recipeId) {
            return res.json({ message: 'No recipe found' });
        }
        // API request to fetch recipe by recipe ID
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${recipeId.recipeId}/information?includeNutrition=false&apiKey=${api_key}`
        );
        // return recipe data
        console.log(response.data);
        return res.json(response.data);
      } catch (error: any) {    
        // log error to console
        console.error(error);
        return res.status(500).json({ message: error.message })
      }
    };

const getExternalImage = async (_req: any, res: any) => {
    const imgApiKey = process.env.REACT_APP_UNSPLASH_API_KEY;
    try {
        if (!imgApiKey) {
            throw new Error('Unsplash API key is not defined');
        }
        const response = await axios.get('https://api.unsplash.com/photos/random?query=food&client_id=' + imgApiKey);
        // console.log(response.data);
        // return image data
        return res.json(response.data);
      } catch (error) {
        console.error(error);
        return res.json(error); // return null if error in handling
      }
    };

export { getExternalRecipes , getExternalRecipeById, getExternalImage };