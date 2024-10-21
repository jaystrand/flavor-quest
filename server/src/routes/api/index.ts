import { Router } from 'express';
import userRouter from '../api/user-routes.js';
import recipeRouter from '../api/recipe-routes.js';
// import ingredientRouter from '../api/ingredient-routes.js';
// import commentsRouter from '../api/comment-routes.js';
import favRouter from '../api/favorite-routes.js';

const router = Router();

router.use('/users',userRouter);
router.use('/recipes',recipeRouter);
// router.use('/',ingredientRouter);
// router.use('/',commentsRouter);
// router.use('/users',favRouter);
router.use('/users',favRouter);

export default router;
