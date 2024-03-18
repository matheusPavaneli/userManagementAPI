import { ModelStatic } from 'sequelize';

import TwoStepToken from '../database/models/TwoStepToken';
import ITwoStepRepository from '../interfaces/ITwoStepRepository';
import ITwoStepSecretData from '../interfaces/ITwoStepSecretData';

class TwoStepRepository implements ITwoStepRepository {
  private TwoStepToken: ModelStatic<TwoStepToken> = TwoStepToken;

  async store(tokenData: ITwoStepSecretData): Promise<TwoStepToken> {
    const { token, tokenUrl, userId } = tokenData;

    const existingToken = await this.TwoStepToken.findOne({
      where: { userId: userId },
    });

    if (existingToken) {
      return existingToken;
    }

    const newToken = await this.TwoStepToken.create({
      token,
      tokenUrl,
      userId,
    });
    return newToken;
  }

  async findTokenByUserId(userId: number): Promise<TwoStepToken | null> {
    const token = await this.TwoStepToken.findOne({
      where: {
        userId: userId,
      },
    });

    return token;
  }
}

export default TwoStepRepository;
