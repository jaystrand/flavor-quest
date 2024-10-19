import dotenv from 'dotenv';
dotenv.config();

import {Sequelize} from 'sequelize';
import {UserFactory} from './users.js'
import {RecipeFactory} from './recipes.js'
import {IngredientFactory} from './ingredients.js'
import {FavoriteFactory} from './favorites.js'
import {CommentFactory} from './comments.js';

const sequelize = process.env.DB_URL
? new Sequelize(process.env.DB_URL)
: new Sequelize(
    process.env.DB_NAME ||'',
    process.env.DB_USER ||'',
    process.env.DB_PASSWORD ||'',
    {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
            decimalNumbers: true,
        },
    }
);

//Initializing models
const User = UserFactory(sequelize);
const Recipe = RecipeFactory(sequelize);
const Ingredient = IngredientFactory(sequelize);
const Favorites = FavoriteFactory(sequelize);
const Comments = CommentFactory(sequelize);

// Defining associations
// User and Recipe
User.hasMany(Recipe, { foreignKey: 'user_id' });
Recipe.belongsTo(User,{foreignKey:'user_id'});

//User and Comment
User.hasMany(Comments,{foreignKey:'user_id'});
Comments.belongsTo(User,{foreignKey:'user_id'});

//Recipe and Comment
Recipe.hasMany(Comments,{foreignKey:'recipe_id'});
Comments.belongsTo(Recipe,{foreignKey:'recipe_id'});

//User and Favorite
User.hasMany(Favorites,{foreignKey: 'user_id'});
Favorites.belongsTo(User,{foreignKey:'user_id'});

//Recipe and Favorite
Recipe.hasMany(Favorites,{foreignKey:'recipe_id'});
Favorites.belongsTo(Recipe,{foreignKey:'recipe_id'});

//Recipe and Ingredients
Recipe.hasMany(Ingredient,{foreignKey:'recipe_id'});
Ingredient.belongsTo(Recipe,{foreignKey:'recipe_id'});

export {sequelize,User,Recipe,Comments,Favorites,Ingredient}