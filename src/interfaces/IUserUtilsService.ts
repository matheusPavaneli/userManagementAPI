export default interface IUserUtilsService {
  resetPassword(newPassword: string, token: string): Promise<void>;
}
