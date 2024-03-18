import dotenv from 'dotenv';
dotenv.config();
const { BASE_URL } = process.env;

import emailTransporter from '../utils/emailTransporter';
import { BadRequestError } from '../utils/ApiError';
import IEmailService from '../interfaces/IEmailService';
import IResetTokenService from '../interfaces/IResetTokenService';

class EmailService implements IEmailService {
  private ResetTokenService: IResetTokenService;
  constructor(ResetTokenService: IResetTokenService) {
    this.ResetTokenService = ResetTokenService;
  }

  async sendResetPassword(userEmail: string): Promise<void> {
    const resetToken = await this.ResetTokenService.createResetToken(userEmail);
    const encodedResetToken = encodeURIComponent(resetToken);
    const resetUrl = `${BASE_URL}/reset-password/${encodedResetToken}`;

    const sendedEmail = await emailTransporter.sendMail({
      from: 'User Management Project <usermanagementproject1@gmail.com>',
      to: userEmail,
      subject: 'Password Reset Link',
      text: `You are receiving this email because you (or someone else) have requested a password reset for your account.
    Please use the provided link to reset your password:
    ${resetUrl}
    If you did not request this, please ignore this email and your password will remain unchanged.`,
      html: `You are receiving this email because you (or someone else) have requested a password reset for your account.<br><br>
    Please click on the following link, or paste this into your browser to complete the process:<br>
    <a href='${resetUrl}'>Reset Password</a><br><br>
    If you did not request this, please ignore this email and your password will remain unchanged.`,
    });

    if (!sendedEmail) {
      throw new BadRequestError('It was not possible to send the email');
    }
  }
}

export default EmailService;
