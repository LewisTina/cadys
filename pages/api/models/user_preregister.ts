import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/database';

class UserPreRegister extends Model {
  public id!: number;
  public user_uuid!: string
  public code!: Text
  public expired_date!: Date
  public readonly add_on!: Date;
  public readonly modified_on!: Date;

}

UserPreRegister.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
    },
    add_on: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    modified_on: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },

  {
    sequelize,
    modelName: 'UserPreRegister',
    tableName: 'users_pre_register',
  }
);

export default UserPreRegister;
