export default interface IResetTokenService {
  createResetToken(userEmail: string): Promise<string>;
}
