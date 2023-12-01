import express from 'express';
import { AcdSemesterController } from './acdSemester.controller';
import validateRequest from '../../middlware/validateRequest';
import { acdSemesterValidation } from './acdValidatoin';
const router = express.Router();

router
  .post(
    '/create-acd-semester',
    validateRequest(acdSemesterValidation.createAcdSemesterValidation),
    AcdSemesterController.createAcdSemester
  )
  .get('/', AcdSemesterController.getAllSemester)
  .get('/:id', AcdSemesterController.getSingleSemester)
  .patch(
    '/:id',
    validateRequest(acdSemesterValidation.updateAcdSemesterValidation),
    AcdSemesterController.updateSingleSemester
  );

export const AcademicSemesterRoutes = router;
