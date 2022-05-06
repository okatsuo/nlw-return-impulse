import { IMailAdapter, ISendMail } from '../mailAdapter';
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2fcdb5a9f08db8",
    pass: "c1f3644d5269e8"
  }
});

export class NodemailerMailAdapter implements IMailAdapter {
  async sendMail({ subject, body }: ISendMail): Promise<void> {
    await transport.sendMail({
      from: 'Equipe Feedget <suporte@feedget.com>',
      to: 'Rafael Gonçalves <rafael@email.com>',
      subject,
      html: body
    })
  }
}