import ResetToken from '../database/models/ResetToken';
import ITokenData from './IResetTokenData';

export default interface IResetTokenRepository {
  store(tokenData: ITokenData): Promise<ResetToken>;
  findLatestToken(userId: number): Promise<ResetToken | null>;
  removeTokensUser(userId: number): Promise<void>;
  getUserIdByToken(tokenData: string): Promise<number>;
  deleteExpiredTokensForUser(userId: number): Promise<void>;
}
