import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express();
import routes from './app/routes';

// using cors
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
// app.use('/api/v1/users/', userRouter);
app.use('/api/v1', routes);

// parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response) => {
  res.send('University Management Authentication Server Running');
});

//global error handler
app.use(globalErrorHandler);

export default app;
