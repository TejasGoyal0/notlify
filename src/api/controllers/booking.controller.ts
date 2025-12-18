import type {Request , Response} from 'express'
import { bookingService } from '../../domains/booking/booking.service.js';
import { emitBookingConfirmedEvent } from '../../events/booking.events.js';

export async function bookingController(req:Request , res: Response){
    try{
        const {email , showId , amount , isPaymentVerified } = req.body;
            const booking = await bookingService.book({
            email , 
            showId , 
            amount , 
            isPaymentVerified
    });

        if(isPaymentVerified){
                    await emitBookingConfirmedEvent(booking);
        }
        res.status(201).json({
            booking : {
                id : booking.id , 
                email : booking.email , 
                amount : booking.amount , 
                isPaymentVerified : booking.isPaymentVerified
            }
        }

        );
    }catch(err:any){
     console.log("Booking Error: " , err);
     res.status(400).json({ error : err.message ?? "Booking Failed" });
    }
}