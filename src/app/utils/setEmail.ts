import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'shohidul.naeem@gmail.com',
      pass: 'otgz haop rxrr pqev',
    },
  });

  await transporter.sendMail({
    from: 'shohidul.naeem@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset Password password Within 10 Minues', // Subject line
    text: 'Hello world?', // plain text body
    html, // html body
  });
};
