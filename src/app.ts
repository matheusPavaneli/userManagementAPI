import 'express-async-errors';
import 'reflect-metadata';
import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
dotenv.config();

import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import twoStepRoutes from './routes/twoStepRoutes';
import passwordRoutes from './routes/passwordRoutes';
import imageRoutes from './routes/imageRoutes';
import errorHandler from './middlewares/errorHandler';
import corsConfig from './config/corsConfig';
import csrfRoutes from './routes/csrfRoutes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares(): void {
    this.app.use(cors(corsConfig));
    this.app.use(helmet());
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes(): void {
    this.app.use('/user', userRoutes);
    this.app.use('/2FA', twoStepRoutes);
    this.app.use('/', authRoutes);
    this.app.use('/', passwordRoutes);
    this.app.use('/image', imageRoutes);
    this.app.use('/csrf', csrfRoutes);
    this.app.use(errorHandler);
  }
}

export default new App().app;
