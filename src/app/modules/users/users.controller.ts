import { Request, Response } from 'express';
import usersService from './users.service';
import catchAsync from '../../../shared/HOF/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/utilities/sendResponse';
import { IUser } from './users.interface';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await usersService.createUserToDB(user);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

export default { createUser };
