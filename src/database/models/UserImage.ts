import { Model } from 'sequelize';
import sequelize from 'sequelize';

import db from '.';
import IModels from '../../interfaces/IModels';

class UserImage extends Model {
  declare imageUrl: string;
  declare userId: number;

  static associate(models: IModels) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  }
}

UserImage.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    imageUrl: {
      type: sequelize.STRING,
      allowNull: false,
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
    tableName: 'userImages',
    timestamps: true,
  },
);

export default UserImage;
