import moment from 'moment-timezone';
import ITokenRepository from '../interfaces/IResetTokenRepository';
import IUserRepository from '../interfaces/IUserRepository';
import { NotFoundError, UnauthorizedError } from '../utils/ApiError';
import IUserUtilsService from '../interfaces/IUserUtilsService';

class UserUtilsService implements IUserUtilsService {
  private TokenRepository: ITokenRepository;
  private UserRepository: IUserRepository;

  constructor(
    TokenRepository: ITokenRepository,
    UserRepository: IUserRepository,
  ) {
    this.TokenRepository = TokenRepository;
    this.UserRepository = UserRepository;
  }

  async resetPassword(newPassword: string, token: string): Promise<void> {
    const userId = await this.TokenRepository.getUserIdByToken(token);
    const latestToken = await this.TokenRepository.findLatestToken(userId);
    const user = await this.UserRepository.findUserById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!latestToken) {
      throw new NotFoundError('Invalid token');
    }

    if (latestToken.expiryDate < moment.tz('America/Sao_Paulo').toDate()) {
      await this.deleteExpiredTokensForUser(userId);
      throw new UnauthorizedError('Expired token');
    }

    user.password = newPassword;
    await user.save();
    await this.TokenRepository.removeTokensUser(userId);
  }

  async deleteExpiredTokensForUser(userId: number) {
    await this.TokenRepository.deleteExpiredTokensForUser(userId);
  }
}

export default UserUtilsService;
