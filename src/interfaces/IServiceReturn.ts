import IAuthService from './IAuthService';
import IEmailService from './IEmailService';
import ITwoStepService from './ITwoStepService';
import IUserService from './IUserService';
import IResetTokenService from './IResetTokenService';
import IUserUtilsService from './IUserUtilsService';
import IImageService from './IImageService';

export default interface IServiceReturn {
  userService: IUserService;
  userUtilsService: IUserUtilsService;
  authService: IAuthService;
  emailService: IEmailService;
  resetTokenService: IResetTokenService;
  twoStepService: ITwoStepService;
  imageService: IImageService;
}
