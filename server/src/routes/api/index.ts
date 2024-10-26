import { Router } from 'express';
import userRouter from '../api/user-routes.js';
import recipeRouter from '../api/recipe-routes.js';
// import ingredientRouter from '../api/ingredient-routes.js';
import commentsRouter from '../api/comment-routes.js';
import favRouter from '../api/favorite-routes.js';
import externalRecipeRouter from '../api/external-recipe-routes.js';
import getExternalRecipeById from '../api/external-recipe-routes.js';
import getExternalImage from '../api/external-recipe-routes.js';


const router = Router();

router.use('/users',userRouter);
router.use('/recipes',recipeRouter);
// router.use('/',ingredientRouter);
router.use('/',commentsRouter);
// router.use('/users',favRouter);
router.use('/users',favRouter);
router.use('/external-recipes',externalRecipeRouter);
router.use('/external-recipes-id',getExternalRecipeById);
router.use('/external-image',getExternalImage);

export default router;
