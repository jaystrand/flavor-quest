import { Request, Response } from 'express';
import { Favorite } from '../models/favorites.js';
import {Recipe} from '../models/recipes.js'

// Get all favorite recipes for a user
export const getFavoritesForUser = async (req: Request, res: Response): Promise<Response> => {
    const { user_id } = req.params;  // user_id from URL parameters
  
    try {
      // Find all favorite recipes associated with the user
      const favorites = await Favorite.findAll({
        where: { user_id },
        include: [{ model: Recipe }]  // Include recipe details with the favorites
      });
  
      if (!favorites.length) {
        return res.status(404).json({ message: 'No favorite recipes found for this user' });
      }
  
      return res.json(favorites);  // Return all favorite recipes
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

// Add a recipe to favorites
export const addFavorite = async (req: Request, res: Response): Promise<Response> => {
  const { recipe_id } = req.body;
  const user_id = parseInt(req.params.user_id, 10);  // Convert user_id from string to number //extract from url params

  try {
    // Save the new favorite in the database
    const newFavorite = await Favorite.create({
      recipe_id,
      user_id // Pass the user_id as a value, not a property
    });

    return res.status(201).json({
      message: 'Recipe added to favorites successfully',
      favorite: newFavorite
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};