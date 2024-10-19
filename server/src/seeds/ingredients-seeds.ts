import { Ingredient } from '../models/index.js';

export const seedIngredients = async () => {
  await Ingredient.bulkCreate([
    {
      recipe_id: 1,  
      name: 'Spaghetti',
      quality: '200g',
      unit: 'grams',
    },
    {
      recipe_id: 1,
      name: 'Tomato Sauce',
      quality: '150ml',
      unit: 'ml',
    },
    {
      recipe_id: 2,
      name: 'Flour',
      quality: '300g',
      unit: 'grams',
    },
    {
      recipe_id: 2,
      name: 'Cocoa Powder',
      quality: '50g',
      unit: 'grams',
    },
  ]);
};