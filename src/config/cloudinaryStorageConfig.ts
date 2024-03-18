import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { Request } from 'express';
import cloudinaryConfig from './cloudinaryConfig';

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryConfig,
  params: (req: Request, file: Express.Multer.File) => {
    return {
      folder: 'profilePictures',
      format: 'jpg',
      public_id: `computed-filename-${Date.now()}-${file.originalname}`,
    };
  },
});

const parser = multer({ storage: storage });
export default parser;
