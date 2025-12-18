import { Resend } from "resend";
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY);

export const flowEmailService = {
  async sendBookingmail(input: { email: string}) {
    const { email } = input;

    const { data, error } = await resend.emails.send({
      from: "Notifly <onboarding@resend.dev>", 
      to: email,
      subject: "You Just Booked ",
      html: `
        <div style="font-family: sans-serif; padding: 16px;">
          <h2>Hey there ,  👋</h2>
          <p>You have booked yourself for an amazing event..</p>
         
        <br/>
          <p>Cheers,<br/>The Notifly Team</p>
        </div>
      `,
    });

    if (error) {
      console.error("Failed to send booking email:", error);
      throw new Error(error.message ?? "Failed to booking email");
    }

    console.log("Booking email sent, id:", data?.id);
    return data;
  },

  async generateTicketMail(input: { email: string}) {
    const { email } = input;

    const { data, error } = await resend.emails.send({
      from: "Notifly <onboarding@resend.dev>", 
      to: email,
      subject: "Here Are Your Tickets ",
      html: `
        <div style="font-family: sans-serif; padding: 16px;">
          <h2>Hey there ,  👋</h2>
          <p>You Ticket Id is 2A56 890. Please Show during entry.</p>
         
        <br/>
          <p>Cheers,<br/>The Notifly Team</p>
        </div>
      `,
    });

    if (error) {
      console.error("Failed to send booking email:", error);
      throw new Error(error.message ?? "Failed to booking email");
    }

    console.log("Booking email sent, id:", data?.id);
    return data;
  }
};
