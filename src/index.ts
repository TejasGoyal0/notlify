import express from 'express';
import type { Request, Response } from 'express';
import authRouter from './api/routes/auth.route.js';
import bookingRouter from './api/routes/booking.route.js';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send("App is Running!");
});

app.use(express.json());

app.use("/auth",authRouter);
app.use("/booking",bookingRouter);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
