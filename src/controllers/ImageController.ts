import { Request, Response } from 'express';
import { services } from '../utils/createServices';

import cloudinary from '../config/cloudinaryConfig';

class imageController {
  async upload(req: Request, res: Response) {
    const { imageService } = services;
    const id = req.user?.id;

    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file!.path);
    const fileUrl = result.secure_url;
    console.log(fileUrl);

    try {
      const { imageUrl } = await imageService.upload(fileUrl!, Number(id));
      res
        .status(201)
        .json({ message: 'Image uploaded successfully', imageUrl });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new imageController();
