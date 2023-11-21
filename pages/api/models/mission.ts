import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

export enum MissionState {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
    CANCELED = 'CANCELED',
    REJECTED='REJECTED'
  }

class Mission extends Model {
  public uuid!: string;
  public request_date!: Date
  public intervention_date_start!: Date
  public intervention_date_end!: Date
  public client_uuid!: string
  public remark!: string
  public brand_uuid!: string
  public state!: MissionState
  public intervention_address!: string
  public activities!: any
  public is_urgent!: boolean
  public is_delete!: boolean
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

Mission.init(
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      allowNull: false
      },
    request_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    intervention_date_start: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    intervention_date_end: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    client_uuid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    brand_uuid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.ENUM("PENDING","IN_PROGRESS","DONE","CANCELED","REJECTED"),
      allowNull: true,
    },
    intervention_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    activities: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    is_urgent: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    is_delete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    }
  },

  {
    sequelize,
    modelName: 'Mission',
    tableName: 'assignment',
  }
);

export default Mission;
