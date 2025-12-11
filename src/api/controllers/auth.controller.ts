import type {Request , Response} from 'express';
import { welcomeQueue } from "../../queues/welcome.queue.js";
import {signedinQueue} from "../../queues/signedin.queue.js"
import { authService } from '../../domains/auth/auth.service.js';

export async function signupController(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    const user = await authService.signup({ name, email, password });

    const job = await welcomeQueue.add("welcome-email", {
      email: user.email,
      name: user.name,
    });

    console.log("[SIGNUP] Enqueued welcome-email job:", job.id, job.data);

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err: any) {
    console.error("[SIGNUP] Error:", err);
    res.status(400).json({ error: err.message ?? "Signup failed" });
  }
}

// ----------------------
// SIGN_IN CONTROLLER 
// ----------------------

export async function signinController(req:Request , res:Response){
  try {
    const {email , password} = req.body;

    const session = await authService.signin({email , password})
    const user = session.user;

    const job = await signedinQueue.add("signedin-mail",
      { email:user.email }
    )

    console.log("SignIn Job Enqueues:" , job.id , job.data);

    res.status(201).json({
      user:{
        email : user.email
      },

    });
  } catch(err:any){
    console.log("Signin Error: ",err);
    res.status(400).json({error:err.message ?? "Signin Failed"});
  }
}

