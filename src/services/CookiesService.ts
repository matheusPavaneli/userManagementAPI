import { Response } from 'express';

export class CookiesService {
  static addCookie(res: Response, cookieName: string, value: string): void {
    res.cookie(cookieName, value, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  static clearCookie(res: Response, cookieName: string): void {
    res.clearCookie(cookieName);
  }
}
