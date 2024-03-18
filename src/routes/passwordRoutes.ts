import { Router } from 'express';

import PasswordController from '../controllers/PasswordController';
import {
  validatePasswordReset,
  validateNewPassword,
} from '../middlewares/validateFields';

const router = Router();

router.post(
  '/forgot-password',
  validatePasswordReset,
  PasswordController.forgotPassword,
);
router.post(
  '/reset-password/:token',
  validateNewPassword,
  PasswordController.resetPassword,
);

export default router;
