import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { usersRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/acdSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/acdFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/acdDepartment/acdDepartent.route';

const router = Router();
// application route

const moduleRoutes = [
  {
    path: '/users',
    route: usersRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
