import {Request, Response } from 'express';
import {Recipe} from '../models/recipes.js';
import { Ingredient } from '../models/index.js';

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

  //getREcipesby userid
  export const getRecipesByUserId = async (req : Request, res:Response) => {
    const { user_id } = req.params; // Extract user_id from route parameter
  
    try {
      // Find all recipes by the specific user
      const recipes = await Recipe.findAll({
        where: { user_id },
      });
  
      // Check if any recipes were found
      if (recipes.length > 0) {
        res.status(200).json(recipes);
      } else {
        res.status(404).json({ message: 'No recipes found for this user' });
      }
    } catch (error) {
      console.error("Error fetching user's recipes:", error);
      res.status(500).json({ message: 'Error fetching recipes', error });
    }
  };

  // Create a new recipe
export const createRecipe = async (req: Request, res: Response): Promise<Response> => {
    const { user_id, title, description, image_url, type, ingredients} = req.body;
    const userId = parseInt(req.body.user_id, 10);
    console.log("User ID -> backend",user_id);
    console.log("Incoming recipe data: - backend ", req.body);
    try {
      const newRecipe = await Recipe.create({
        user_id : userId,
        title,
        description,
        image_url,
        type,
      });
      console.log("New REcipe Backend -> ",newRecipe);
  // Add ingredients to the recipe and store them in an array to return
    const createdIngredients = [];
    // Add ingredients to the recipe
  if (ingredients && ingredients.length > 0) {
    for (const ingredient of ingredients) {
      const newIngredient = await Ingredient.create({
        recipe_id: newRecipe.recipe_id, // Link the ingredient to the recipe
        name: ingredient.name,
        quality: ingredient.quality,
        unit: ingredient.unit||'unit',
      });
      console.log("Created Ingredients Backend -> ",createdIngredients);
      createdIngredients.push(newIngredient); // Store created ingredient
    }
  }
      return res.status(201).json({
        message: 'Recipe created successfully',
        recipe: newRecipe,
        ingredients: createdIngredients, //included ingriedients in the respons
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
  