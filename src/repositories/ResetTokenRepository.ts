import { ModelStatic, Op } from 'sequelize';
import moment from 'moment-timezone';

import IResetTokenRepository from '../interfaces/IResetTokenRepository';
import ResetToken from '../database/models/ResetToken';
import ITokenData from '../interfaces/IResetTokenData';

class ResetTokenRepository implements IResetTokenRepository {
  private ResetToken: ModelStatic<ResetToken> = ResetToken;

  async store(tokenData: ITokenData): Promise<ResetToken> {
    const { token, expiryDate, userId } = tokenData;
    const newToken = await this.ResetToken.create({
      token,
      expiryDate,
      userId,
    });
    return newToken;
  }

  async findLatestToken(userId: number): Promise<ResetToken | null> {
    const token = await this.ResetToken.findOne({
      where: { userId: userId },
      order: [['createdAt', 'DESC']],
    });

    return token;
  }

  async removeTokensUser(userId: number): Promise<void> {
    await this.ResetToken.destroy({
      where: {
        userId: userId,
      },
    });
  }

  async getUserIdByToken(tokenData: string): Promise<number> {
    const token = await this.ResetToken.findOne({
      where: {
        token: tokenData,
      },
    });

    return token?.userId ?? 0;
  }

  async deleteExpiredTokensForUser(userId: number): Promise<void> {
    await this.ResetToken.destroy({
      where: {
        userId: userId,
        expiryDate: {
          [Op.lt]: moment.tz('America/Sao_Paulo').toDate(),
        },
      },
    });
  }
}

export default ResetTokenRepository;
