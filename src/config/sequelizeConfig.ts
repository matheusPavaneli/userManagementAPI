import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize-typescript';

const sequelizeConfig = new Sequelize({
  dialect: 'mysql',
  host: process.env.DATABASE_HOST || '127.0.0.1',
  port: parseInt(process.env.DATABASE_PORT || '3306', 10),
  username: process.env.DATABASE_USERNAME || 'root',
  password: process.env.DATABASE_PASSWORD || 'defaultPassword',
  database: process.env.DATABASE || 'defaultDatabase',
  define: {
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  dialectOptions: {
    timezone: '-03:00',
  },
  timezone: '-03:00',
  logging: false,
  models: [__dirname + '/models'],
});

export default sequelizeConfig;
