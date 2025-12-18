import {Queue} from 'bullmq'
import { redisConnection } from '../infra/redis'

export const bookingQueue = new Queue("booking-email-queue", {
    connection : redisConnection , 
    defaultJobOptions:{
        attempts : 3,
        backoff:{
            delay:2000 , 
            type : 'exponential'
        }
    }
})
