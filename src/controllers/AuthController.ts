import { Request, Response } from 'express';
import { services } from '../utils/createServices';
import JWTService from '../services/JWTService';
import { CookiesService as cookiesService } from '../services/CookiesService';
import { BadRequestError } from '../utils/ApiError';

class AuthController {
  async register(req: Request, res: Response) {
    const { userService } = services;
    const { username, email, password } = req.body;
    await userService.store({ username, email, password });
    res.status(200).json({ message: 'You have registered successfully' });
  }

  async login(req: Request, res: Response) {
    const { authService, twoStepService, imageService } = services;
    const { loginContent, password } = req.body;

    if (req.cookies['token'] || req.user) {
      throw new BadRequestError('You are already logged in');
    }

    const user = await authService.authenticate({ loginContent, password });
    const token = JWTService.createJWT(user);
    const twoStepQRCodeUrl = await twoStepService.getQRCode2FA(Number(user.id));
    const { imageUrl } = await imageService.getUserImage(Number(user.id));
    cookiesService.addCookie(res, 'token', token);
    res.status(200).json({
      message: 'You have successfully logged in',
      user,
      twoStepQRCodeUrl,
      token,
      imageUrl,
    });
  }
  async logout(req: Request, res: Response) {
    cookiesService.clearCookie(res, 'token');
    req.user = null;
    res.status(200).json({ message: 'You have successfully logged out' });
  }
}

export default new AuthController();
