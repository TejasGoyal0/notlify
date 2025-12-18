import type {Request , Response} from 'express';
import { authService } from '../../domains/auth/auth.service.js';
import { emitUserSignedUpEvent , emitUserSignedInEvent} from '../../events/auth.events.js';


export async function signupController(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    const user = await authService.signup({ name, email, password });

     await emitUserSignedUpEvent(user);

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
    
    await emitUserSignedInEvent(user);
    console.log("User Signed in Event emitted for :", user.email);
   
    res.status(201).json({
      user:{
        email : user.email, 
        id : user.id
      },

    });
  } catch(err:any){
    console.log("Signin Error: ",err);
    res.status(400).json({error:err.message ?? "Signin Failed"});
  }
}

