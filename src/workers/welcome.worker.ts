import { Worker } from "bullmq";
import { redisConnection } from "../infra/redis.js";
import { emailService } from "../services/welcome-email.service.js";

console.log("Welcome Mail Worker started...");

export const welcomeMailWorker = new Worker(
  "welcome-queue",
  async (job) => {
    console.log("[WORKER] Processing job", job.id, job.name, job.data);

    if (job.name === "send-welcome-email") {
      const { email, name } = job.data as { email: string; name: string };

      // TEMP: log before calling Resend
      console.log("[WORKER] Calling emailService.sendWelcomeEmail for", email);

      await emailService.sendWelcomeEmail({ email, name });

      console.log("[WORKER] Email send call completed for", email);
    }
  },
  { connection: redisConnection }
);

// event hooks
welcomeMailWorker.on("completed", (job) => {
  console.log("[WORKER] Job completed:", job.id);
});

welcomeMailWorker.on("failed", (job, err) => {
  console.error("[WORKER] Job failed:", job?.id, err);
});

