import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { usersRoutes } from '../modules/user/user.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
