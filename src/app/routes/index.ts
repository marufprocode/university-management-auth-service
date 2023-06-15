import express from 'express';
import usersRoutes from '../modules/users/users.routes';
import semesterRoutes from '../modules/academicSemester/semester.routes';
import facultyRoutes from '../modules/academicFaculty/faculty.routes';

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
  {
    path: '/faculty',
    route: facultyRoutes,
  },
];

appRoutes.forEach(route => router.use(route.path, route.route));

export default router;
