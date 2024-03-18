// Refatoração de TwoStepService
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';

import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../utils/ApiError';
import ITwoStepService from '../interfaces/ITwoStepService';
import ITwoStepTokenRepository from '../interfaces/ITwoStepRepository';
import IUserRepository from '../interfaces/IUserRepository';
import ITwoStepSecretData from '../interfaces/ITwoStepSecretData';

class TwoStepService implements ITwoStepService {
  private TwoStepTokenRepository: ITwoStepTokenRepository;
  private UserRepository: IUserRepository;

  constructor(
    TwoStepTokenRepository: ITwoStepTokenRepository,
    UserRepository: IUserRepository,
  ) {
    this.UserRepository = UserRepository;
    this.TwoStepTokenRepository = TwoStepTokenRepository;
  }

  private async create2FAToken(
    userId: number,
    userEmail: string,
  ): Promise<ITwoStepSecretData> {
    const secretToken = speakeasy.generateSecret({ length: 20 });
    const secret = secretToken.base32;

    const otpauthUrl = speakeasy.otpauthURL({
      secret,
      encoding: 'base32',
      label: encodeURIComponent(userEmail),
      issuer: 'userManagement',
    });
    console.log(otpauthUrl);

    if (!otpauthUrl) {
      throw new BadRequestError('Unable to create QR Code link');
    }

    const twoStepUrlQRCode = await this.createQRCode(otpauthUrl);

    const TwoStepToken = await this.TwoStepTokenRepository.store({
      token: secret,
      tokenUrl: twoStepUrlQRCode,
      userId,
    });

    return TwoStepToken;
  }

  async verify2FAToken(userId: number, token: string): Promise<boolean> {
    const secret = await this.TwoStepTokenRepository.findTokenByUserId(userId);

    if (!secret) {
      throw new NotFoundError('Token not found');
    }

    const verified = speakeasy.totp.verify({
      secret: secret.token,
      encoding: 'base32',
      token,
      window: 1,
    });

    if (!verified) {
      throw new UnauthorizedError('Invalid code, please try again');
    }

    return verified;
  }

  async active2FA(userId: number, userEmail: string): Promise<string> {
    const user = await this.UserRepository.findUserById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const { tokenUrl } = await this.create2FAToken(userId, userEmail);
    user.twoStep = true;
    await user.save();

    return tokenUrl;
  }

  async desactive2FA(userId: number): Promise<void> {
    const user = await this.UserRepository.findUserById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const token = await this.TwoStepTokenRepository.findTokenByUserId(userId);

    if (!token) {
      throw new NotFoundError('Token not found');
    }

    user.twoStep = false;
    await token.destroy();
    await user.save();
  }

  private async createQRCode(otpauthURL: string): Promise<string> {
    const twoStepUrlQRCode = await qrcode.toDataURL(otpauthURL);

    if (!twoStepUrlQRCode) {
      throw new BadRequestError('Unable to create QR Code image');
    }

    return twoStepUrlQRCode;
  }

  async getQRCode2FA(userId: number): Promise<string> {
    const twoStepToken =
      await this.TwoStepTokenRepository.findTokenByUserId(userId);
    return twoStepToken?.tokenUrl ?? '';
  }
}

export default TwoStepService;
