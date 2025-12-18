import { Worker } from "bullmq";
import { redisConnection } from "../infra/redis.js";
import {flowEmailService} from "../services/flow-email.service.js"
import { db } from "../infra/database.js";


export const bookingWorker = new Worker(
  "booking-email-queue",
  async (job) => {
    console.log("[BOOKING WORKER]", job.name, job.data);

    switch (job.name) {
      case "send-booking-confirmation": {
  const booking = await db.booking.findUnique({
    where: { id: job.data.bookingId },
    select: { email: true }
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  await flowEmailService.sendBookingmail({
    email: booking.email
  });

  break;
}


      case "generate-tickets": {
  const booking = await db.booking.findUnique({
    where: { id: job.data.bookingId },
    select: { email: true }
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  await flowEmailService.generateTicketMail({
    email: booking.email
  });

  break;
}


      case "booking-flow":
        // Optional: usually empty
        console.log("Booking flow completed");
        break;

      default:
        throw new Error(`Unknown job type: ${job.name}`);
    }
  },
  { connection: redisConnection }
);
