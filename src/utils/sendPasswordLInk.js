import {
  transporter
} from '../helpers/mailHelper';
import { resetPasswordTemplate } from './resetPasswordTemplate';
export const sendPasswordResetLink = async (info) => {
  try {
    const {
      email,
      authToken,
      name,
    } = info;
    const emailTemplate = resetPasswordTemplate({ authToken, name });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Password Reset',
      html: emailTemplate,
    };
    const emailsent = await transporter.sendMail(mailOptions);
    if (emailsent) {
      const message = 'Password reset  email has been sent to you email please go and confirm that email';
      const data = {
        authToken,
      };
      return {
        message,
        data,
      };
    }
  } catch (error) {
    throw new Error(error)
  }
};