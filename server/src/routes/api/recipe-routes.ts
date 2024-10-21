import express from 'express';
import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
//   deleteRecipe, //may add it later
} from '../../controllers/recipe-controller.js';
import { addIngredient, getIngredientsForRecipe } from '../../controllers/ingredients-controller.js';
const recipeRouter = express.Router();

// Route to get all recipes
recipeRouter.get('/', getAllRecipes);

// Route to get a specific recipe by ID
recipeRouter.get('/:recipe_id', getRecipeById);

// Route to create a new recipe
recipeRouter.post('/', createRecipe);

// Route to update a recipe by ID
recipeRouter.put('/:recipe_id', updateRecipe);

// Add ingredient to a specific recipe
recipeRouter.post('/:recipe_id/ingredients', addIngredient);

// Get all ingredients for a specific recipe
recipeRouter.get('/:recipe_id/ingredients', getIngredientsForRecipe);
// Route to delete a recipe by ID
// recipeRouter.delete('/:recipe_id', deleteRecipe); // may add it later not decided yet

export default recipeRouter;