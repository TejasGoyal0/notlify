
import { Worker } from "bullmq";
import { redisConnection } from "../infra/redis.js";
import { Event_Router_Queue_Name } from "./eventsQueue.js";
import type { domainEvent} from "./events.js"
import { eventRouterService } from "./eventsService.js";

const connection = redisConnection;

export const eventRouterWorker = new Worker<domainEvent>(
  Event_Router_Queue_Name,
  async (job) => {
    const event = job.data;

    if (!event?.type || !event?.payload) {
      throw new Error("Invalid event payload");
    }

    await eventRouterService.route(event);
  },
  { connection }
);
