import TwoStepToken from '../database/models/TwoStepToken';
import ITwoStepSecretData from './ITwoStepSecretData';

export default interface ITwoStepRepository {
  store(tokenData: ITwoStepSecretData): Promise<TwoStepToken>;
  findTokenByUserId(userId: number): Promise<TwoStepToken | null>;
}
