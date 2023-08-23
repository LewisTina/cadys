import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

export class Gender extends Model {
    public code!: string;
    public title_i18n!: JSON
  }
  
Gender.init(
    {
      title_i18n: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      code: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false
      },
  
    },
    {
      sequelize,
      modelName: 'Gender',
      tableName: 'gender',
      timestamps: false
    }
  )
  