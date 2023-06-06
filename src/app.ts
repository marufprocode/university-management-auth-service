import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import userRouter from './app/modules/users/users.routes';
const app: Application = express();

// using cors
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1/users/', userRouter);

// parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response) => {
  res.send('University Management Authentication Server Running');
});

export default app;
