import express from 'express';
import usersRoutes from '../modules/users/users.routes';
import semesterRoutes from '../modules/academicSemester/semester.routes';

const router = express.Router();

const appRoutes = [
  {
    path: '/users',
    route: usersRoutes,
  },
  {
    path: '/academic-semester',
    route: semesterRoutes,
  },
];

appRoutes.forEach(route => router.use(route.path, route.route));

export default router;
