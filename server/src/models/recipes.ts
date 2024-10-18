import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './users';

interface RecipeAttributes{
    recipe_id: number;
    user_id: number;
    title: string;
    description: string;
    image_url?: string; // I'm putting it as optional assuming there is change that there may not be any
    type: string;
}

interface RecipeCreationAttributes extends Optional<RecipeAttributes,'recipe_id'>{}

export class Recipe extends Model<RecipeAttributes,RecipeCreationAttributes> implements RecipeAttributes{
    public recipe_id!: number;
    public user_id!: number;
    public title!: string;
    public description!: string;
    public image_url?: string | undefined;
    public type!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function RecipeFactory(sequelize: Sequelize): typeof Recipe {

    Recipe.init(
        {
           recipe_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true, // primary key
           } ,
           user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User, // this is the foriegn key -> User
            }
           },
           title: {
            type: DataTypes.STRING,
            allowNull: false,

           },
           description: {
            type: DataTypes.TEXT, // check this later
            allowNull: false,
           },
           image_url: {
            type: DataTypes.STRING,
            allowNull: true, // if there is no image then it should be set to null

           },
           type: {
            type: DataTypes.STRING,
            allowNull: false,
           },
        },
        {
            tableName: 'recipes',
            sequelize,
        }
    );

    return Recipe; // returns the initialized model

}