import { Resend } from "resend";
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY);

export const emailService = {
  async sendWelcomeEmail(input: { email: string; name: string }) {
    const { email, name } = input;

    const { data, error } = await resend.emails.send({
      from: "Notifly <onboarding@resend.dev>", // change to your verified domain later
      to: email,
      subject: "Welcome to Notifly!",
      html: `
        <div style="font-family: sans-serif; padding: 16px;">
          <h2>Welcome, ${name} 👋</h2>
          <p>We're excited to have you onboard!</p>
          <p>You can now start booking events and we'll handle all reminders and notifications.</p>
          <br/>
          <p>Cheers,<br/>The Notifly Team</p>
        </div>
      `,
    });

    if (error) {
      console.error("Failed to send welcome email:", error);
      throw new Error(error.message ?? "Failed to send welcome email");
    }

    console.log("Welcome email sent, id:", data?.id);
    return data;
  },
};
