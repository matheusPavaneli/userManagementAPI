import { Model } from 'sequelize';
import sequelize from 'sequelize';

import db from '.';
import IModels from '../../interfaces/IModels';

class TwoStepToken extends Model {
  declare token: string;
  declare tokenUrl: string;
  declare userId: number;

  static associate(models: IModels) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  }
}

TwoStepToken.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    token: {
      type: sequelize.STRING,
      allowNull: false,
      unique: {
        name: 'token',
        msg: 'This verification token already exists',
      },
    },
    tokenUrl: {
      type: sequelize.STRING,
      allowNull: false,
    },
    userId: {
      type: sequelize.INTEGER,
      unique: {
        name: 'userId',
        msg: 'This user already has a 2FA token',
      },
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize: db,
    tableName: 'twoStepTokens',
    timestamps: true,
  },
);

export default TwoStepToken;
