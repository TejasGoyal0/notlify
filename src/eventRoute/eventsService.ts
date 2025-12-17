import { FlowProducer } from "bullmq";
import { redisConnection } from "../infra/redis.js";
import { signedinQueue } from "../queues/signedin.queue.js";
import { welcomeQueue } from "../queues/welcome.queue.js";
import { EventTypes, type domainEvent } from "./events.js";

const flowProducer = new FlowProducer({connection: redisConnection});

export class eventRouterService { 
    static async route( event : domainEvent){
        switch(event.type){
            case EventTypes.USER_SIGNED_UP:
                return this.handleUserSignUp(event);
            
            case EventTypes.USER_SIGNED_IN:
                return this.handleUserSignin(event);

            case EventTypes.BOOKING_CONFIRMED: 
                 return this.handleBookingConfirmed(event);

            case EventTypes.PAYMENT_COMPLETED:
                return this.handlePaymentCompleted(event);

        }
    }
    private static async handleUserSignUp(event : any){
     await Promise.all([
        welcomeQueue.add("send-welcome-email" , {
            name : event.payload.name,
            email : event.payload.email
        })
     ])
    }

    private static async handleUserSignin(event : any){
        await Promise.all([
            signedinQueue.add("signedin-mail",{
                email : event.payload.email
            })
        ])
    }

    private static async handleBookingConfirmed(event : any){
        
    }

    private static async handlePaymentCompleted(event : any){
        
    }
}