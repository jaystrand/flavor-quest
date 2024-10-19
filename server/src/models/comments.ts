import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './users.js';
import { Recipe } from './recipes.js';

interface CommentAttribute{
comment_id: number;
user_id: number;
recipe_id: number;
text: string;    
}
interface CommentCreationAttributes extends Optional<CommentAttribute,'comment_id'> {}

export class Comment extends Model<CommentAttribute,CommentCreationAttributes> implements CommentAttribute{
    public comment_id!: number;
    public user_id!: number;
    public recipe_id!: number;
    public text!: string; // check if I need to create it as optional

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function CommentFactory(sequelize: Sequelize): typeof Comment{
    Comment.init(
        {
            comment_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey:true, //PK
            },
            user_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: User, //FK reference to User
                    key: 'user_id',
                }
            },
            recipe_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Recipe, // FK reference to Recipe
                    key: 'recipe_id',
                }
            },
            text:{
                type: DataTypes.INTEGER,
                allowNull: false,
            },

        },
        {
            tableName: 'comments', // Name of the table in PostgesSQL
            sequelize,
        }
    );

    return Comment; 
}