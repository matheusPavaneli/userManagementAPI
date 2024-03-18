import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';

const errorHandler = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const statusCode = error.statusCode ?? 500;
  const message = statusCode ? error.message : 'Internal Server Error';
  return res.status(statusCode).json({ message });
};

export default errorHandler;
