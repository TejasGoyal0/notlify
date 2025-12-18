import { Router } from "express";
import type { Request , Response } from "express";
import { bookingController } from "../controllers/booking.controller.js";

const bookingRouter = Router();

bookingRouter.post("/book" , (req : Request , res : Response)=> {
  void bookingController(req , res)
});

export default bookingRouter;