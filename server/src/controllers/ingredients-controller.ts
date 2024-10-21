import { Request, Response } from 'express';
import { Ingredient } from '../models/ingredients.js';

// Get all ingredients for a recipe
export const getIngredientsForRecipe = async (req: Request, res: Response): Promise<Response> => {
    const { recipe_id } = req.params;  // recipe_id from URL parameters
  
    try {
      // Find all ingredients associated with the recipe
      const ingredients = await Ingredient.findAll({ where: { recipe_id } });
  
      if (!ingredients.length) {
        return res.status(404).json({ message: 'No ingredients found for this recipe' });
      }
  
      return res.json(ingredients);  // Return all ingredients
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };
// Add a new ingredient to a recipe
export const addIngredient = async (req: Request, res: Response): Promise<Response> => {
  const { recipe_id, name, quality, unit } = req.body;

  try {
    // Save the new ingredient in the database
    const newIngredient = await Ingredient.create({
      recipe_id,
      name,
      quality,
      unit
    });

    return res.status(201).json({
      message: 'Ingredient added successfully',
      ingredient: newIngredient
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};