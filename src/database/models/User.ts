import { Model } from 'sequelize';
import sequelize from 'sequelize';
import bcrypt from 'bcryptjs';

import db from '.';
import IModels from '../../interfaces/IModels';

class User extends Model {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare twoStep: boolean;

  async comparePassword(inputPassword: string): Promise<boolean> {
    return await bcrypt.compare(inputPassword, this.password);
  }

  static associate(models: IModels) {
    this.hasMany(models.ResetToken, {
      foreignKey: 'userId',
      as: 'tokens',
    });
    this.hasMany(models.TwoStepToken, {
      foreignKey: 'userId',
      as: 'tokens',
    });
    this.hasMany(models.UserImage, {
      foreignKey: 'userId',
      as: 'userImages',
    });
  }
}

User.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: sequelize.STRING,
      allowNull: false,
      unique: {
        name: 'username',
        msg: 'This username is already taken',
      },
    },
    email: {
      type: sequelize.STRING,
      allowNull: false,
      unique: {
        name: 'email',
        msg: 'This email is already taken',
      },
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
    },
    twoStep: {
      type: sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    tableName: 'users',
    timestamps: true,
  },
);

User.beforeCreate(async (user: User) => {
  const hashedPassword = await bcrypt.hash(user.password, 14);
  user.password = hashedPassword;
});

User.beforeUpdate(async (user: User) => {
  if (user.changed('password')) {
    const hashedPassword = await bcrypt.hash(user.password, 14);
    user.password = hashedPassword;
  }
});

export default User;
