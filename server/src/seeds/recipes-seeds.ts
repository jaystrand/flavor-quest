import { Recipe } from '../models/index.js';

export const seedRecipes = async () => {
  await Recipe.bulkCreate([
    {
      user_id: 1,
      title: 'Spaghetti Bolognese',
      description: 'A classic Italian pasta dish.',
      image_url: 'https://example.com/image1.jpg',
      type: 'Dinner',
    },
    {
      user_id: 2, 
      title: 'Chocolate Cake',
      description: 'A rich and moist chocolate cake.',
      image_url: 'https://example.com/image2.jpg',
      type: 'Dessert',
    },
  ]);
};