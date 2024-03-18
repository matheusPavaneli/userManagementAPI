import UserImage from '../database/models/UserImage';

export default interface IImageRepository {
  store(imageUrl: string, userId: number): Promise<UserImage>;
  getUserImage(userId: number): Promise<{ imageUrl: string }>;
}
