import { Queue } from "bullmq";
import { redisConnection } from "../infra/redis.js";
import type {domainEvent} from "./events.js"

export const Event_Router_Queue_Name = 'event_router';

export const eventQueue = new Queue<domainEvent>(
    Event_Router_Queue_Name , {
        connection : redisConnection, 
        defaultJobOptions: {
        attempts : 5 ,
        backoff : {
            type : 'exponential' , 
            delay : 1000 
        },
        removeOnComplete : true,
        removeOnFail : false
    }});

// Api to put events in the Event Queue. 

export async function emitEvent ( event : domainEvent){
    await eventQueue.add(event.type , event , {
        jobId : event.eventId
    })
};
