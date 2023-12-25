import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentControllers } from './student.controller';
import { updateStudentValidationSchema } from './student.validation';
import { USER_ROLE } from '../user/user.const';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  StudentControllers.getAllStudents
);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.faculty),
  StudentControllers.getSingleStudent
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.faculty),
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent
);

router.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = router;
