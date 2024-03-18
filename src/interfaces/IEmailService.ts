export default interface IEmailService {
  sendResetPassword(userEmail: string): Promise<void>;
}
