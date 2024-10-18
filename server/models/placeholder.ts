import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db/databse';

// Define the attributes for the Placeholder model
interface PlaceholderAttributes {
  id: number;
  name: string;
}

// Define the creation attributes for the Placeholder model
interface PlaceholderCreationAttributes extends Optional<PlaceholderAttributes, 'id'> {}

// Define the Placeholder model class
class Placeholder extends Model<PlaceholderAttributes, PlaceholderCreationAttributes> implements PlaceholderAttributes {
  public id!: number;
  public name!: string;
}

// Initialize the Placeholder model
Placeholder.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Placeholder',
  }
);

export default Placeholder;