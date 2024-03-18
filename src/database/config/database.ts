import dotenv from 'dotenv';
import { Options } from 'sequelize';
dotenv.config();

const config: Options = {
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT ?? '3306', 10),
  dialect: 'mysql',
  timezone: '-03:00',
};

export = config;
