import {Request, Response } from 'express';
import {Recipe} from '../models/recipes.js';


// Get all recipes
export const getAllRecipes = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const recipes = await Recipe.findAll();
      if (!recipes.length) {
        return res.status(404).json({ message: 'No recipes found' });
      }
      return res.json(recipes);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

// Get a specific recipe by ID
export const getRecipeById = async (req: Request, res: Response): Promise<Response> => {
    const { recipe_id } = req.params;
    try {
      const recipe = await Recipe.findByPk(recipe_id);
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
      return res.json(recipe);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Create a new recipe
export const createRecipe = async (req: Request, res: Response): Promise<Response> => {
    const { user_id, title, description, image_url, type } = req.body;
    try {
      const newRecipe = await Recipe.create({
        user_id,
        title,
        description,
        image_url,
        type,
      });
      return res.status(201).json({
        message: 'Recipe created successfully',
        recipe: newRecipe,
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Update an existing recipe
export const updateRecipe = async (req: Request, res: Response): Promise<Response> => {
    const { recipe_id } = req.params;
    const { title, description, image_url, type } = req.body;
    try {
      const recipe = await Recipe.findByPk(recipe_id);
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
  
      // Update the recipe fields
      recipe.title = title || recipe.title;
      recipe.description = description || recipe.description;
      recipe.image_url = image_url || recipe.image_url;
      recipe.type = type || recipe.type;
  
      await recipe.save();
      return res.json({
        message: 'Recipe updated successfully',
        recipe,
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };
  