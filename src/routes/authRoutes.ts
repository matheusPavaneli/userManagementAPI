import { Router } from 'express';

import verifyToken from '../middlewares/verifyToken';
import { validateUserCreation } from '../middlewares/validateFields';
import AuthController from '../controllers/AuthController';
import csrfProtection from '../middlewares/csrfProtection';

const router = Router();

router.post('/register', validateUserCreation, AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', csrfProtection, verifyToken, AuthController.logout);

export default router;
