import nodemailer from "nodemailer";

export const sendEmail = async (email: string, emailType: string, link: string) => {
  try {
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAILER_USER,
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click this to <a href="${link}">${emailType === "VERIFY" ? "Verify your Email" : "Reset your Password"}</a></p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error sending email: " + error.message);
    }
    throw new Error("An unknown error occurred while sending email");
  }
};