import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

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
      html: `<p>Click <a href="${link}">${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}</a></p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error("Error sending email: " + error.message);
  }
};
