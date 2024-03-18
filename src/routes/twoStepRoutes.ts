import { Router } from 'express';

import verifyToken from '../middlewares/verifyToken';
import TwoStepController from '../controllers/TwoStepController';
import { validate2FACode } from '../middlewares/validateFields';
import csrfProtection from '../middlewares/csrfProtection';
const router = Router();

router.post(
  '/activate',
  csrfProtection,
  verifyToken,
  TwoStepController.activate,
);
router.post(
  '/verify',
  csrfProtection,
  verifyToken,
  validate2FACode,
  TwoStepController.verify,
);
router.post(
  '/desactive',
  csrfProtection,
  verifyToken,
  validate2FACode,
  TwoStepController.desactive,
);

export default router;
