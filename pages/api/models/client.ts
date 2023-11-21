import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

export class Client extends Model {
    public uuid!: string;
    public email!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
Client.init(
    {
      uuid: {
        type: DataTypes.UUID,
        unique: true,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  
    },
    {
      sequelize,
      modelName: 'Client',
      tableName: 'client',
    }
  )
  