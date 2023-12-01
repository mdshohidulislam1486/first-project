import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import { studentValidations } from '../student/student.zod.validation';
import validateRequest from '../../middlware/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidation),
  UserControllers.createStudent
);

export const usersRoutes = router;
