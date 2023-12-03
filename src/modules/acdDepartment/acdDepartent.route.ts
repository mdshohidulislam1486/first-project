import express from 'express';

import validateRequest from '../../middlware/validateRequest';
import { AcdDepartmentValidation } from './acdDepartmetn.validation';
import { AcademicDeparmentControllers } from './acdDepartment.controller';

const router = express.Router();

router
  .post(
    '/create-academic-department',
    validateRequest(AcdDepartmentValidation.createAcdDepartmentValidatinSchema),
    AcademicDeparmentControllers.createAcademicDepartment
  )
  .get('/', AcademicDeparmentControllers.getAllAcademicDepartments)
  .get(
    '/:departmentId',
    AcademicDeparmentControllers.getSingleAcademicDepartment
  )
  .patch(
    '/:departmentId',
    validateRequest(AcdDepartmentValidation.updateAcdDepartmentValidatinSchema),
    AcademicDeparmentControllers.updateSingleAcademicDepartment
  );

export const AcademicDepartmentRoutes = router;
