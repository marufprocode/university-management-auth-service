import { RequestHandler } from 'express';
import usersService from './users.service';
import catchAsync from '../../../shared/HOF/catchAsync';
import httpStatus from 'http-status';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const { user } = req.body;
  const result = await usersService.createUserToDB(user);
  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

export default { createUser };
