import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

export class Activities extends Model {
    public uuid!: string;
    public code!: number;
    public title_i18n!: JSON
  }
  
Activities.init(
    {
      uuid: {
        type: DataTypes.UUID,
        unique: true,
      },
      title_i18n: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      code: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
  
    },
    {
      sequelize,
      modelName: 'Activities',
      tableName: 'activities',
      timestamps: false
    }
  )
  