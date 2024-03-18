import { Router } from 'express';
import csrfController from '../controllers/csrfController';
import csrfProtection from '../middlewares/csrfProtection';
const router = Router();

router.get('/get', csrfProtection, csrfController.get);

export default router;
