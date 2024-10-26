import express from 'express';
import { getExternalRecipes , getExternalRecipeById , getExternalImage } from '../../controllers/external-recipe-controller.js';

const externalRecipeRouter = express.Router();


// Route to get all recipes
externalRecipeRouter.post('/external-recipes', getExternalRecipes);
externalRecipeRouter.post('/external-recipes-id', getExternalRecipeById);
externalRecipeRouter.post('/external-image', getExternalImage);

export default externalRecipeRouter;