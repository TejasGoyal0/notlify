
export enum EventTypes { 
    USER_SIGNED_UP = "USER_SIGNED_UP",
    USER_SIGNED_IN = "USER_SIGNED_IN",
    PAYMENT_COMPLETED = "PAYMENT_COMPLETED",
    BOOKING_CONFIRMED = "BOOKING_CONFIRMED"
}

 interface BaseEvent<T extends EventTypes , P>{
    type : T , 
    payload : P , 
    createdAt : string , 
    eventId : string
}

export type userSignedUpEvent = BaseEvent<
EventTypes.USER_SIGNED_UP, 
{
    name : string , 
    email : string
}
>;

export type userSignedInEvent = BaseEvent<
EventTypes.USER_SIGNED_IN , 
{
  email : string
}
>;

export type bookingConfirmedEvent = BaseEvent<
EventTypes.BOOKING_CONFIRMED, 
{
    email : string , 
    bookingId : string, 
    name : string
}
>;




export type domainEvent = 
| userSignedUpEvent
| userSignedInEvent
| bookingConfirmedEvent
