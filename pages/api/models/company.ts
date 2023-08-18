import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/database';

export class Company extends Model {
  public uuid!: string;
  public email_pro!: string;
  public name!: string
  public siret!: string
  public activities!: JSON
  public address_uuid!: string
  public legal_status!: string
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}
export class LegalStatus extends Model {
  public uuid!: string;
  public title_i18n!: JSON
  public code!: string
}

LegalStatus.init(
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    title_i18n: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true,
    },

  },
  {
    sequelize,
    modelName: 'LegalStatus',
    tableName: 'company_legal_status',
  }
)

Company.init(
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    email_pro: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    siret: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    activities: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    address_uuid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    legal_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  },

  {
    sequelize,
    modelName: 'Company',
    tableName: 'company',
  }
);
