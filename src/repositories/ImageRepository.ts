import { ModelStatic } from 'sequelize';
import UserImage from '../database/models/UserImage';
import IImageRepository from '../interfaces/IImageRepository';

class ImageRepository implements IImageRepository {
  private userImage: ModelStatic<UserImage> = UserImage;

  async store(imageUrl: string, userId: number): Promise<UserImage> {
    const imageExists = await this.userImage.findOne({ where: { userId } });

    if (imageExists) {
      await this.userImage.update({ imageUrl }, { where: { userId } });
      await imageExists.reload();
      return imageExists;
    }

    const userImage = await this.userImage.create({ imageUrl, userId });
    return userImage;
  }

  async getUserImage(userId: number): Promise<{ imageUrl: string }> {
    const image = await this.userImage.findOne({ where: { userId } });
    return image ? { imageUrl: image.imageUrl } : { imageUrl: '' };
  }
}

export default ImageRepository;
