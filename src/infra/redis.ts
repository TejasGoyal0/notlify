import { createClient } from "redis";
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.REDIS_URL;

if(!url){
    throw new Error("Redis Url not found")
};

export const redisClient = createClient({
    url,
});

redisClient.on('error' , err => console.error('Redis Client Error:',err));

await redisClient.connect();

export const redisConnection = {
    url,
};