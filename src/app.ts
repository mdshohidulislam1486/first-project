'use strict';
import express, { Application } from 'express';
import cors from 'cors';
import { StudentRoutes } from './modules/student/student.route';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

// application route

app.use('/api/v1/students', StudentRoutes);

console.log(process.cwd());

export default app;
