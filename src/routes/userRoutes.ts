import { Router } from 'express';

import verifyToken from '../middlewares/verifyToken';
import UserController from '../controllers/UserController';
import { validateUserUpdate } from '../middlewares/validateFields';
import csrfProtection from '../middlewares/csrfProtection';

const router = Router();

router.post('/delete/', csrfProtection, verifyToken, UserController.delete);
router.post(
  '/update/',
  csrfProtection,
  verifyToken,
  validateUserUpdate,
  UserController.update,
);

export default router;
