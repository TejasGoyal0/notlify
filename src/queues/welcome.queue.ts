import { Queue } from "bullmq";
import {redisConnection} from '../infra/redis.js'


export const welcomeQueue = new Queue('welcome-queue',{
    connection : redisConnection
})