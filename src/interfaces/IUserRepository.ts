import User from '../database/models/User';
import IUserData from './IUserData';
import IUserDataAuthentication from './IUserDataAuthentication';

export default interface IUserRepository {
  store(userData: IUserData): Promise<User>;
  findUserById(id: number): Promise<User | null>;
  removeUser(user: User): Promise<void>;
  editUser(user: User, newData: Partial<IUserData>): Promise<User | null>;
  findUserByLoginMethod(
    user: Partial<IUserDataAuthentication>,
  ): Promise<User | null>;
  findUserByEmail(userEmail: string): Promise<User | null>;
}
