import { Resend } from "resend";
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY);

export const signedinemailService = {
  async signedinmail(input: { email: string}) {
    const { email } = input;

    const { data, error } = await resend.emails.send({
      from: "Notifly <onboarding@resend.dev>", 
      to: email,
      subject: "You Just Signed in ",
      html: `
        <div style="font-family: sans-serif; padding: 16px;">
          <h2>Hey there ,  👋</h2>
          <p>You have logged in your account.</p>
          <p>If its you , then cool else your account might be compromised.</p>
          <p>Please change your password</p>
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
