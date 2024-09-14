/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === 'VERIFY') {
      //update the User's token for the verified token
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiration: Date.now() + 3600000,
      });
    } else if (emailType === 'RESET') {
      //update the User's token for the verified token
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiration: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: 'rahulontussledigital@gmail.com',
      to: email,
      subject:
        emailType === 'VERIFY'
          ? 'Verify your email'
          : emailType === 'RESET'
          ? 'Reset your password'
          : emailType === 'LOGIN_SUCCESS'
          ? 'Logged in successfully'
          : emailType === 'ACCOUNT_CREATED'
          ? 'Your account has been created'
          : emailType === 'PASSWORD_CHANGED'
          ? 'Your password has been changed'
          : 'Unknown email type',
      text:
        emailType === 'VERIFY' || 'RESET'
          ? `<p>Hello,\n\nPlease ${
              emailType === 'VERIFY' ? 'verify' : 'reset'
            } your password by clicking on the following:\n\n<a href='${
              process.env.DOMAIN
            }/verifyemail?token${hashedToken}'>${
              emailType === 'VERIFY' ? 'Verify Button' : 'Reset Button'
            }</a>\n\n OR Copy and Paste the link below in your browser. <br> ${
              process.env.DOMAIN
            }/verifyemail?token=${hashedToken}\n\nIf you did not request this, please ignore this email.\n\nBest regards,\nAgro Team</p>`
          : `<p>You logged in Successfully!</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
