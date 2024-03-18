import { Router } from 'express';
import ImageController from '../controllers/ImageController';
import verifyToken from '../middlewares/verifyToken';
import multer from 'multer';
import csrfProtection from '../middlewares/csrfProtection';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.post(
  '/upload',
  csrfProtection,
  verifyToken,
  upload.single('photo'),
  ImageController.upload,
);

export default router;
