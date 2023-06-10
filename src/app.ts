import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import router from './app/routers';
import httpStatus from 'http-status';
const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);

// test route
// app.get('/', (req: Request, res: Response) => {
//   // res.send('Hello World!')
//   //
//   //   Promise.reject(new Error('I am new error hear!'))
// })

// global Error Handler
app.use(globalErrorHandler);

// if API not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found !',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'API not found !',
      },
    ],
  });
  next();
});

export default app;
