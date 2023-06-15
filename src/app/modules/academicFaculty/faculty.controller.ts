import httpStatus from 'http-status';
import catchAsync from '../../../shared/HOF/catchAsync';
import { IFaculty } from './faculty.interface';
import sendResponse from '../../../shared/utilities/sendResponse';
import facultyService from './faculty.service';
import { Request, Response } from 'express';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const facultyData = req.body;
  const result = await facultyService.createFacultyToDB(facultyData);
  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'User created successfully',
    data: result,
  });
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

export default {
  createFaculty,
};
