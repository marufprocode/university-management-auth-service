import express from 'express';
import usersRoutes from '../modules/users/users.routes';

const router = express.Router();

const appRoutes = [
  {
    path: '/users',
    route: usersRoutes,
  },
];

appRoutes.forEach(route => router.use(route.path, route.route));

export default router;
