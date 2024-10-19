import { DataTypes,  Sequelize, Model, Optional } from 'sequelize';
import { Recipe } from './recipes.js';

interface IngredientAttributes{
    ingredients_id: number;
    recipe_id: number;
    name: string;
    quality: string;
    unit: string;
}

interface IngredientCreationAttributes extends Optional<IngredientAttributes,'ingredients_id'>{}

export class Ingredient extends Model<IngredientAttributes,IngredientCreationAttributes> implements IngredientAttributes{
    public ingredients_id!: number;
    public recipe_id!: number;
    public name!: string;
    public quality!: string;
    public unit!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function IngredientFactory(sequelize: Sequelize): typeof Ingredient{
    Ingredient.init(
        {
            ingredients_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            recipe_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Recipe,
                    key: 'recipe_id',
                }
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            quality: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            unit: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'ingredients', //Name of table in db
            sequelize,
        }
    );

    return Ingredient;
}