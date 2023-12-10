import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router();

router
  .post(
    '/create-course',
    validateRequest(CourseValidations.createCourseValidationSchema),
    CourseControllers.createCourse
  )
  .get('/', CourseControllers.getAllCourses)
  .get('/:id', CourseControllers.getSingleCourse)
  .delete('/:id', CourseControllers.deleteSingleCourse)

  .patch(
    '/:id',
    validateRequest(CourseValidations.updateCourseValidationSchema),
    CourseControllers.updateSingleCourse
  )
  .put(
    '/:courseId/assign-faculties',
    validateRequest(CourseValidations.FacultyWithCourseValidationScheam),
    CourseControllers.assignFacultiesWithCourse
  )
  .delete(
    '/:courseId/remove-faculties',
    validateRequest(CourseValidations.FacultyWithCourseValidationScheam),
    CourseControllers.removeFacultiesFromCourse
  );
export const CourseRoutes = router;
