import { Request, Response } from 'express';
import { services } from '../utils/createServices';

class PasswordController {
  async forgotPassword(req: Request, res: Response) {
    const { emailService } = services;
    const { email } = req.body;
    await emailService.sendResetPassword(email);
    res.status(200).json({
      message: 'A password reset email has been sent to you successfully',
    });
  }

  async resetPassword(req: Request, res: Response) {
    const { userUtilsService } = services;
    const token = decodeURIComponent(req.params.token);
    const { password } = req.body;
    await userUtilsService.resetPassword(password, token);
    res
      .status(200)
      .json({ message: 'Your password has been changed successfully' });
  }
}

export default new PasswordController();
