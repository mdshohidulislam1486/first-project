import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router
  .get('/', StudentControllers.getAllStudents)
  .get('/:studentId', StudentControllers.getSingleStudents)
  .delete('/:studentId', StudentControllers.deleteSingleStudents);
export const StudentRoutes = router;
