import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { InternalServerError } from '../utils/ApiError';
import IUserDataResponse from '../interfaces/IUserDataResponse';

const { SECRET_KEY } = process.env;

class JWTService {
  static createJWT(payload: IUserDataResponse): string {
    const { id, username, email, twoStep } = payload;
    const token = jwt.sign(
      { id, username, email, twoStep },
      SECRET_KEY ?? 'default',
      {
        expiresIn: '7d',
      },
    );

    if (!token) {
      throw new InternalServerError('Unable to create authentication token');
    }

    return token;
  }
}

export default JWTService;
