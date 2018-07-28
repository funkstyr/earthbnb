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

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log("Email Error:", err.message);
    }

    console.log("Message sent:", info.messageId);

    const url = nodemailer.getTestMessageUrl(info);
    console.log("Preview url:", url);

    return url;
  });
};
