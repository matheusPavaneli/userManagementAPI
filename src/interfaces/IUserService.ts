import User from '../database/models/User';
import IUserDataResponse from './IUserDataResponse';
import IUserData from './IUserData';

export default interface IUserService {
  store(userData: IUserData): Promise<IUserDataResponse>;
  update(
    id: number,
    newData: Partial<IUserData>,
  ): Promise<IUserDataResponse | null>;
  delete(id: number): Promise<User>;
}
