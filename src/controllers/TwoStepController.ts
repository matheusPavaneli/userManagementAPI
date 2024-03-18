import { Request, Response } from 'express';
import { services } from '../utils/createServices';

class TwoStepController {
  async activate(req: Request, res: Response) {
    const { twoStepService } = services;

    if (req.user) {
      const { id, email } = req.user;
      const twoStepQRCodeUrl = await twoStepService.active2FA(
        Number(id),
        email,
      );
      res.status(200).json({
        message: 'Two-factor authentication successfully activated!',
        twoStepQRCodeUrl,
      });
    }
  }

  async verify(req: Request, res: Response) {
    const { twoStepService } = services;
    const { verifyCode }: { verifyCode: string } = req.body;
    const id = req.user?.id;

    await twoStepService.verify2FAToken(Number(id), verifyCode);
    res.status(200).json({ message: 'Authenticated successfully' });
  }

  async desactive(req: Request, res: Response) {
    const { twoStepService } = services;
    const { verifyCode }: { verifyCode: string } = req.body;
    const id = req.user?.id;

    await twoStepService.verify2FAToken(Number(id), verifyCode);
    await twoStepService.desactive2FA(Number(id));
    res.status(200).json({
      message: 'Two-factor authentication has been successfully disabled',
    });
  }
}

export default new TwoStepController();
