import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

class UserPreRegister extends Model {
  public id!: number;
  public user_uuid!: string
  public code!: Text
  public expired_date!: Date
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

UserPreRegister.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
      },
    user_uuid: {
      type: DataTypes.UUID,
      allowNull: true
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    expired_date: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  },

  {
    sequelize,
    modelName: 'UserPreRegister',
    tableName: 'users_pre_register',
  }
);

export default UserPreRegister;
