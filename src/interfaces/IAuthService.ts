import IUserDataAuthentication from './IUserDataAuthentication';
import IUserDataResponse from './IUserDataResponse';

export default interface IAuthService {
  authenticate(userData: IUserDataAuthentication): Promise<IUserDataResponse>;
}
