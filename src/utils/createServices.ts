import IAuthService from '../interfaces/IAuthService';
import IEmailService from '../interfaces/IEmailService';
import IServiceReturn from '../interfaces/IServiceReturn';
import IUserRepository from '../interfaces/IUserRepository';
import IUserService from '../interfaces/IUserService';
import AuthService from '../services/AuthService';
import EmailService from '../services/EmailService';
import UserRepository from '../repositories/UserRepository';
import UserService from '../services/UserService';
import ITwoStepService from '../interfaces/ITwoStepService';
import TwoStepService from '../services/TwoStepService';
import TwoStepRepository from '../repositories/TwoStepRepository';
import ITwoStepRepository from '../interfaces/ITwoStepRepository';
import IResetTokenService from '../interfaces/IResetTokenService';
import ResetTokenService from '../services/ResetTokenService';
import IResetTokenRepository from '../interfaces/IResetTokenRepository';
import ResetTokenRepository from '../repositories/ResetTokenRepository';
import IUserUtilsService from '../interfaces/IUserUtilsService';
import UserUtilsService from '../services/UserUtilsService';
import IImageService from '../interfaces/IImageService';
import ImageService from '../services/ImageService';
import IImageRepository from '../interfaces/IImageRepository';
import ImageRepository from '../repositories/ImageRepository';

const createServices = (): IServiceReturn => {
  const userRepository: IUserRepository = new UserRepository();
  const userService: IUserService = new UserService(userRepository);
  const authService: IAuthService = new AuthService(userRepository);
  const resetTokenRepository: IResetTokenRepository =
    new ResetTokenRepository();
  const resetTokenService: IResetTokenService = new ResetTokenService(
    resetTokenRepository,
    userRepository,
  );
  const twoStepRepository: ITwoStepRepository = new TwoStepRepository();
  const twoStepService: ITwoStepService = new TwoStepService(
    twoStepRepository,
    userRepository,
  );
  const emailService: IEmailService = new EmailService(resetTokenService);
  const userUtilsService: IUserUtilsService = new UserUtilsService(
    resetTokenRepository,
    userRepository,
  );
  const imageRepository: IImageRepository = new ImageRepository();
  const imageService: IImageService = new ImageService(
    imageRepository,
    userRepository,
  );

  return {
    userService,
    userUtilsService,
    authService,
    emailService,
    resetTokenService,
    twoStepService,
    imageService,
  };
};

export const services = createServices();
