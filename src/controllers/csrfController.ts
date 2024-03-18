import { Request, Response } from 'express';

class imageController {
  async get(req: Request, res: Response) {
    const token = req.csrfToken();
    res.status(200).json({ csrfToken: token });
  }
}

export default new imageController();
