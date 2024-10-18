import { DataTypes,  Sequelize, Model, Optional } from 'sequelize';

interface UserAttributes{
    user_id: number;
    username: string;
    password: string;
    email: string;
}
interface UserCreationAttributes extends Optional<UserAttributes, 'user_id'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public user_id!: number; 
    public username!: string; 
    public password!: string;
    public email!: string; 

    public readonly createdAt!: Date; 
    public readonly updatedAt!: Date;
}

export function UserFactory(sequelize: Sequelize): typeof User {
    User.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
        },
        {
            tableName: 'users',
            sequelize,
        }
    );   

    return User;

}