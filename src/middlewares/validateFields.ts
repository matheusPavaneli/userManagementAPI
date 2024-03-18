import { Request, Response, NextFunction } from 'express';

import {
  userCreationSchema,
  userUpdateSchema,
  resetPasswordSchema,
  newPasswordSchema,
  TwoStepCodeSchema,
} from '../utils/fieldValidation';
import { BadRequestError } from '../utils/ApiError';

const validateUserCreation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = userCreationSchema.validate(req.body, {
    abortEarly: false,
  });
  const errorMessages = error?.details.map((err) => err.message).join(', ');

  if (errorMessages) {
    throw new BadRequestError(errorMessages);
  }

  next();
};

const validateUserUpdate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = userUpdateSchema.validate(req.body, {
    abortEarly: false,
  });
  const errorMessages = error?.details.map((err) => err.message).join(', ');

  if (errorMessages) {
    throw new BadRequestError(errorMessages);
  }

  next();
};
const validatePasswordReset = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = resetPasswordSchema.validate(req.body, {
    abortEarly: false,
  });
  const errorMessages = error?.details.map((err) => err.message).join(', ');

  if (errorMessages) {
    throw new BadRequestError(errorMessages);
  }

  next();
};
const validateNewPassword = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = newPasswordSchema.validate(req.body, {
    abortEarly: false,
  });
  const errorMessages = error?.details.map((err) => err.message).join(', ');

  if (errorMessages) {
    throw new BadRequestError(errorMessages);
  }

  next();
};

const validate2FACode = (req: Request, res: Response, next: NextFunction) => {
  const { error } = TwoStepCodeSchema.validate(req.body, {
    abortEarly: false,
  });
  const errorMessages = error?.details.map((err) => err.message).join(', ');

  if (errorMessages) {
    throw new BadRequestError(errorMessages);
  }

  next();
};

export {
  validateUserCreation,
  validateUserUpdate,
  validatePasswordReset,
  validateNewPassword,
  validate2FACode,
};
