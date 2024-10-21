import express from 'express';
import { getFavoritesForUser, addFavorite } from '../../controllers/favorite-controller.js';

const favRouter = express.Router();

// Route to add a recipe to favorites for a specific user
favRouter.post('/:user_id/favorites', addFavorite);

// Route to get all favorite recipes for a user
favRouter.get('/:user_id/favorites', getFavoritesForUser);

export default favRouter;