import express from 'express';
import usersController from './users.controller';
import validateRequestZod from '../../middlewares/validateReqZodMiddleware';
import userValidation from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequestZod(userValidation.createUserZodSchema),
  usersController.createUser
);

export default router;
