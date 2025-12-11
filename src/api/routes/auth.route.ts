import { Router } from "express";
import type {Request , Response} from 'express'
import { signupController  } from "../controllers/auth.controller.js";


const authRouter = Router();

authRouter.post('/sign-up',(req:Request , res:Response) => {
   void signupController(req , res)
});

authRouter.post('/sign-in',(req:Request , res:Response) => {
  
});

export default authRouter;
