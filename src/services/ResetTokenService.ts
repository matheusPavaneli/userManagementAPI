import moment from 'moment-timezone';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import IUserRepository from '../interfaces/IUserRepository';
import { NotFoundError } from '../utils/ApiError';
import IResetTokenRepository from '../interfaces/IResetTokenRepository';
import IResetTokenService from '../interfaces/IResetTokenService';

class ResetTokenService implements IResetTokenService {
  private ResetTokenRepository: IResetTokenRepository;
  private UserRepository: IUserRepository;

  constructor(
    ResetTokenRepository: IResetTokenRepository,
    UserRepository: IUserRepository,
  ) {
    this.ResetTokenRepository = ResetTokenRepository;
    this.UserRepository = UserRepository;
  }

  async createResetToken(userEmail: string): Promise<string> {
    const user = await this.UserRepository.findUserByEmail(userEmail);
    const expiryDate = moment.tz('America/Sao_Paulo').add(1, 'hours').format();

    if (!user) {
      throw new NotFoundError('Invalid Token');
    }

    const hashedToken = await this.generateToken();

    await this.ResetTokenRepository.store({
      token: hashedToken,
      expiryDate,
      userId: user.id,
    });
    return hashedToken;
  }

  private async generateToken(): Promise<string> {
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(resetToken, 14);
    return hashedToken;
  }
}

export default ResetTokenService;
