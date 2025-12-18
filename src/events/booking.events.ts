import { EventTypes } from "../eventRoute/events.js";
import { emitEvent } from "../eventRoute/eventsQueue.js";
import { randomUUID } from 'crypto';

export async function emitBookingConfirmedEvent(booking : { 
    id : string , 
    email : string,
    amount : number,
    isPaymentVerified : boolean,
    showId : string

}) { 
    await emitEvent({
        type : EventTypes.BOOKING_CONFIRMED, 
        eventId : randomUUID(),
        payload:{
            bookingId : booking.id, 
            email : booking.email,            
        }, 
        createdAt : new Date().toISOString()

    });
}