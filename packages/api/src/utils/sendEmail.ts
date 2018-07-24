import * as SparkPost from "sparkpost";

const client = new SparkPost(process.env.SPARKPOST_API_KEY);

export const sendEmail = async (address: string, url: string) => {
  const response = await client.transmissions.send({
    options: {
      sandbox: true
    },
    content: {
      from: "test@seed.com",
      subject: "Seed Registration",
      html: `
        <html>
            <body>
                <a href="${url}">Confirm Email</a>
            </body>
        </html>
      `
    },
    recipients: [{ address }]
  });

  console.log("Sent email:", response);
};
