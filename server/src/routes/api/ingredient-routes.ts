import express from 'express';
import { 
    getIngredientsForRecipe, 
    addIngredient 
} from '../../controllers/ingredients-controller.js';

const ingredientRouter = express.Router();

// Route to add an ingredient
ingredientRouter.post('/recipes/:recipe_id/ingredients', addIngredient);

// Route to get all ingredients for a recipe
ingredientRouter.get('/recipes/:recipe_id/ingredients', getIngredientsForRecipe);

export default ingredientRouter;