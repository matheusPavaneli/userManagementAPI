import IAuthService from '../interfaces/IAuthService';
import IUserDataAuthentication from '../interfaces/IUserDataAuthentication';
import IUserRepository from '../interfaces/IUserRepository';
import { NotFoundError, UnauthorizedError } from '../utils/ApiError';
import IUserDataResponse from '../interfaces/IUserDataResponse';

class AuthService implements IAuthService {
  private UserRepository: IUserRepository;

  constructor(UserRepository: IUserRepository) {
    this.UserRepository = UserRepository;
  }

  async authenticate(
    userData: IUserDataAuthentication,
  ): Promise<IUserDataResponse> {
    const { loginContent, password } = userData;

    const user = await this.UserRepository.findUserByLoginMethod({
      loginContent,
    });

    if (!user) {
      throw new NotFoundError('Invalid credentials');
    }

    if (!(await user.comparePassword(password))) {
      throw new UnauthorizedError('Invalid credentials');
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      twoStep: user.twoStep,
    };
  }
}

export default AuthService;
