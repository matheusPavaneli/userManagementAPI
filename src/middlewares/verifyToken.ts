import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { UnauthorizedError } from '../utils/ApiError';
import IJwtUserPayload from '../interfaces/IJwtUserPayload';
const { SECRET_KEY } = process.env;

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthorizedError('You are not allowed to do that');
  }

  const userDecoded = jwt.verify(
    token,
    SECRET_KEY ?? 'default',
  ) as IJwtUserPayload;

  if (!userDecoded) {
    throw new UnauthorizedError('Invalid token');
  }
  req.user = userDecoded;

  next();
};

export default verifyToken;
