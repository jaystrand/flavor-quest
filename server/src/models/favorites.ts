import { DataTypes,Sequelize,Model,Optional } from "sequelize";
import { User } from "./users";
import { Recipe } from "./recipes";

interface FavoriteAttributes{
    fav_id: number;
    user_id: number;
    recipe_id: number;
}

interface FavoriteCreationAttributes extends Optional<FavoriteAttributes,'fav_id'>{}

export class Favorite extends Model<FavoriteAttributes,FavoriteCreationAttributes> implements FavoriteAttributes{
    public fav_id!: number;
    public user_id!: number;
    public recipe_id!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function FavoriteFactory(sequelize: Sequelize): typeof Favorite{
    Favorite.init(
        {
            fav_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: User,
                    key: 'user_id',
                },

            },
            recipe_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Recipe,
                    key: 'recipe_id'
                },

            },
        },
        {
            tableName: 'favorites', // table name in db
            sequelize,
        }
    );

    return Favorite;
}