/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { StudentRoutes } from './modules/student/student.route';
import { usersRoutes } from './modules/user/user.route';
import globalerrorHandler from './middlware/globalErrorHandler';
import notFound from './middlware/notFound';
import router from './routes';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

// application route
app.use('/api/v1', router);

console.log(process.cwd());

app.use(globalerrorHandler);
// not found route
app.use(notFound);

export default app;
