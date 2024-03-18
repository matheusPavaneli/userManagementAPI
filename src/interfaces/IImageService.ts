import UserImage from '../database/models/userImage';

export default interface IImageService {
  upload(fileUrl: string, userId: number): Promise<UserImage>;
  getUserImage(userId: number): Promise<{ imageUrl: string }>;
}
