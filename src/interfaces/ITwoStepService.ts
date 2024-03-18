export default interface ITwoStepService {
  verify2FAToken(userId: number, token: string): Promise<boolean>;
  active2FA(userId: number, userEmail: string): Promise<string>;
  desactive2FA(userId: number): Promise<void>;
  getQRCode2FA(userId: number): Promise<string>;
}
