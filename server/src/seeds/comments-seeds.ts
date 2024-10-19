import { Comments } from '../models/index.js';

export const seedComments = async () => {
  await Comments.bulkCreate([
    {
      user_id: 1,  
      recipe_id: 2, 
      text: 'This cake looks delicious!',
    },
    {
      user_id: 2,  
      recipe_id: 1,  
      text: 'This pasta is great!',
    },
  ]);
};