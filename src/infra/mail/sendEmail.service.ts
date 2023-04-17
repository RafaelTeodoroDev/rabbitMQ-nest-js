import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'

@Injectable()
export class Mail {

  async sendEmail(email: string, message: string, subject: string) {
    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '256e54fd06bf5f',
        pass: 'a17439b6822622',
      },
    });
    const mailOptions = {
      from: 'rafaelteodoro2003@gmail.com',
      to: email,
      subject,
      text: message
    };
    await transporter.sendMail(mailOptions);
  }
}