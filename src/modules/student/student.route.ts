import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlware/validateRequest';
import { studentValidations } from './student.zod.validation';

const router = express.Router();

router
  .get('/', StudentControllers.getAllStudents)
  .get('/:studentId', StudentControllers.getSingleStudents)
  .delete('/:studentId', StudentControllers.deleteSingleStudents)
  .patch(
    '/:studentId',
    validateRequest(studentValidations.updateStudentValidation),
    StudentControllers.updateSingleStudents
  );
export const StudentRoutes = router;
