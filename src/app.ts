import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrorHandler';
import router from './app/routers';
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

app.use(globalErrorHandler);

export default app;
