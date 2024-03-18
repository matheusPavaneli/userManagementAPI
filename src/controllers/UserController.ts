import { Request, Response } from 'express';
import { services } from '../utils/createServices';
import JWTService from '../services/JWTService';
import { CookiesService as cookiesService } from '../services/CookiesService';

class UserController {
  async delete(req: Request, res: Response) {
    const { userService } = services;
    const id = req.user?.id;
    await userService.delete(Number(id));
    cookiesService.clearCookie(res, 'token');
    res
      .status(200)
      .json({ message: 'You have successfully deleted your account' });
  }
  async update(req: Request, res: Response) {
    const { userService } = services;
    const { username, email, password } = req.body;
    const id = req.user?.id;
    const user = await userService.update(Number(id), {
      username,
      email,
      password,
    });
    const token = JWTService.createJWT(user!);
    cookiesService.addCookie(res, 'token', token);
    res
      .status(200)
      .json({ message: 'You have successfully edited your data', user, token });
  }
}

export default new UserController();
