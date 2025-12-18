import { db } from "../../infra/database.js";

interface bookingInput { 
    email : string , 
    showId : string , 
    isPaymentVerified : boolean , 
    amount : number
}

export const bookingService = {
    async book(input:bookingInput){
        const {email , showId , isPaymentVerified , amount} = input; 

        if(!isPaymentVerified){
            throw new Error("Payment is not completed");
        }

        const booking = await db.booking.create({
            data:{
                email, 
                showId, 
                isPaymentVerified,
                amount
            }
        });
        return booking;
    }
}
