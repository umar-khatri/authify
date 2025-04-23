import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (email: string, emailType: string, link: string) => {
  try {
    const subject = emailType === "VERIFY" ? "Verify your email" : "Reset your password";

    const htmlContent = `
      <p>Click here to <a href="${link}" style="color: #2563eb; text-decoration: underline;">
        ${emailType === "VERIFY" ? "Verify your Email" : "Reset your Password"}
      </a></p>
      <p>If you did not request this, you can safely ignore it.</p>
    `;

    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject,
      html: htmlContent,
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error sending email: " + error.message);
    }
    throw new Error("An unknown error occurred while sending email");
  }
};
