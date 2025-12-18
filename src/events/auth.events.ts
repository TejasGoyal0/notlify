import { EventTypes } from "../eventRoute/events.js";
import { emitEvent } from "../eventRoute/eventsQueue.js";
import { randomUUID } from 'crypto';

export async function emitUserSignedUpEvent(user : { 
    id : string , 
    email : string,
    name : string

}) { 
    await emitEvent({
        type : EventTypes.USER_SIGNED_UP , 
        eventId : randomUUID(),
        payload:{
            userId : user.id, 
            email : user.email,
            name : user.name
        }, 
        createdAt : new Date().toISOString()

    });
}

export async function emitUserSignedInEvent(user : { 
    id : string , 
    email : string
}){
    await emitEvent({
        type : EventTypes.USER_SIGNED_IN , 
        createdAt : new Date().toISOString(),
        payload : {
            userId : user.id , 
            email : user.email
        },
        eventId : randomUUID()
    })
}
