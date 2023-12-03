import express from 'express';
import { AcdFacultyValidation } from './acdFaculty.validation';
import validateRequest from '../../middlware/validateRequest';
import { AcademicFacultyControllers } from './acdFaculty.controller';

const router = express.Router();

router
  .post(
    '/create-academic-faculty',
    validateRequest(AcdFacultyValidation.createAcdFacultyValidatinSchema),
    AcademicFacultyControllers.createAcademicFaculty
  )
  .get('/', AcademicFacultyControllers.getAllAcademicFaculties)
  .get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculties)
  .patch(
    '/:facultyId',
    validateRequest(AcdFacultyValidation.updateAcdFacultyValidatinSchema),
    AcademicFacultyControllers.updateSingleAcademicFaculties
  );

export const AcademicFacultyRoutes = router;
