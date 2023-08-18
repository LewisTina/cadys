import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/database';

export enum UserStatusType {
    INACTIVATED = 'INACTIVATED',
    ACTIVATED = 'ACTIVATED',
    INACTIVE = 'INACTIVE',
    DELETED = 'DELETED',
  }
  
  export enum CustomerStatus {
    PROFESSIONAL = 'PROFESSIONAL',
    PARTICULAR = 'PARTICULAR',
  }

export class User extends Model {
  public uuid!: string;
  public role_uuid!: string
  public first_name!: string
  public last_name!: string
  public phone!: string
  public sex!: string
  public email!: string;
  public password_hash!: string
  public last_login!: Date
  public avatar_uuid!: string
  public status!: UserStatusType
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

export class UserRoles extends Model {
  public uuid!: string;
  public title_i18n!: JSON
  public code!: string
}

UserRoles.init(
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
    modelName: 'UserRoles',
    tableName: 'user_roles',
  }
)

User.init(
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    role_uuid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    avatar_uuid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('INACTIVATED', 'ACTIVATED', 'INACTIVE', 'DELETED'),
      defaultValue: UserStatusType.INACTIVATED,
      allowNull: true,
    },
  },

  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  }
);
