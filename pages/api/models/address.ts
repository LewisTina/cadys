import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/database';

class Address extends Model {
  public uuid!: string;
  public zip_code!: Text
  public city!: Text
  public address_title!: Text
  public user_uuid!: string

}

Address.init(
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      allowNull: false
      },
    zip_code: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    address_title: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_uuid: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },

  {
    sequelize,
    modelName: 'Address',
    tableName: 'address',
  }
);

export default Address;
