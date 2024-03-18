import { Model } from 'sequelize';
import sequelize from 'sequelize';

import db from '.';
import IModels from '../../interfaces/IModels';

class ResetToken extends Model {
  declare token: string;
  declare expiryDate: Date;
  declare userId: number;

  static associate(models: IModels) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  }
}

ResetToken.init(
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
    expiryDate: {
      type: sequelize.DATE,
      allowNull: true,
    },
    userId: {
      type: sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize: db,
    tableName: 'resetTokens',
    timestamps: true,
  },
);

export default ResetToken;
