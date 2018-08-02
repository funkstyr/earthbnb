import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

export const sendEmail = async (address: string, url: string, text: string) => {
  const message = {
    from: "Earthbnb <noReply@earthbnb.com>",
    to: `User <${address}>`,
    subject: "Earthbnb Registration - Confirm",
    html: `
        <html>
            <body>
                <a href="${url}">${text}</a>
            </body>
        </html>
      `
  };

  const mail = await transporter.sendMail(message).then(async info => {
    const email = await nodemailer.getTestMessageUrl(info);
    return email;
  });

  Promise.resolve(mail);

  return mail;
};
