import { Favorites } from '../models/index.js';

export const seedFavorites = async () => {
  await Favorites.bulkCreate([
    {
      user_id: 1,  
      recipe_id: 2, 
    },
    {
      user_id: 2,  
      recipe_id: 1,  
    },
  ]);
};