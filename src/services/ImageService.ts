import dotenv from 'dotenv';
dotenv.config();

import UserImage from '../database/models/UserImage';

import IImageRepository from '../interfaces/IImageRepository';
import { BadRequestError, NotFoundError } from '../utils/ApiError';
import IUserRepository from '../interfaces/IUserRepository';
import IImageService from '../interfaces/IImageService';

class ImageService implements IImageService {
  private ImageRepository: IImageRepository;
  private UserRepository: IUserRepository;
  constructor(
    ImageRepository: IImageRepository,
    UserRepository: IUserRepository,
  ) {
    this.ImageRepository = ImageRepository;
    this.UserRepository = UserRepository;
  }

  async upload(fileUrl: string, userId: number): Promise<UserImage> {
    const user = await this.UserRepository.findUserById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const image = await this.ImageRepository.store(fileUrl, userId);

    if (!image) {
      throw new BadRequestError('Unable to send your image');
    }

    return image;
  }

  async getUserImage(userId: number): Promise<{ imageUrl: string }> {
    const image = await this.ImageRepository.getUserImage(userId);
    return image;
  }
}

export default ImageService;
