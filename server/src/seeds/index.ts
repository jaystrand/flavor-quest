import {seedUsers} from './users-seeds.js';
import {seedRecipes} from './recipes-seeds.js';
import { seedIngredients } from './ingredients-seeds.js';
import {seedComments} from './comments-seeds.js';
import {seedFavorites} from './favorites-seeds.js';

import sequelize  from '../config/connection.js'
// sequelize.authenticate()
//   .then(() => {
//     console.log('Database connection established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });
const seedAll = async (): Promise<void> => {
    try{
        await sequelize.sync({force: true});
        console.log('\n----- DATABASE SYNCED -----\n');

         // Seeding in correct order to respect FK
        await seedUsers();
        console.log('\n----- USERS SEEDED -----\n');

        //Recipe deopend on User
        await seedRecipes();
        console.log('\n----- RECIPES SEEDED -----\n');

        // Ingredients depend on Recipes
        await seedIngredients(); 
        console.log('\n----- INGREDIENTS SEEDED -----\n');

        // Comments depend on both Users and Recipes
        await seedComments();
        console.log('\n----- COMMENTS SEEDED -----\n');

         // Favorites depend on Users and Recipes
        await seedFavorites();
        console.log('\n----- FAVORITES SEEDED -----\n');

        
        
    }catch(e){
        console.error('Error seeding db',e);
        //exit if something goes wrong
        process.exit(1);
    }
};

seedAll();