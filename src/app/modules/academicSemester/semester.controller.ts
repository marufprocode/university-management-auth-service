import { RequestHandler } from 'express';
import semesterService from './semester.service';
import catchAsync from '../../../shared/HOF/catchAsync';
import httpStatus from 'http-status';

const createSemester: RequestHandler = catchAsync(async (req, res) => {
  const semester = req.body;
  const result = await semesterService.createSemesterToDB(semester);
  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

export default { createSemester };
