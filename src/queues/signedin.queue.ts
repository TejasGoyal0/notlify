import { Backoffs, delay, Queue } from "bullmq";
import { redisConnection } from "../infra/redis.js";

export const  signedinQueue = new Queue('signedin-queue',{
    connection:redisConnection,

   defaultJobOptions:{
    attempts : 2,
    backoff:{
        type:"fixed", 
        delay:3000,
        jitter:0.5
    }

}});



