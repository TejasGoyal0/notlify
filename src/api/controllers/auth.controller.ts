import type {Request , Response} from 'express';
import { welcomeQueue } from "../../queues/welcome.queue.js";
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
