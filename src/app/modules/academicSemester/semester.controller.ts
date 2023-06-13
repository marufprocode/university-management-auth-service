import { Request, Response } from 'express';
import semesterService from './semester.service';
import catchAsync from '../../../shared/HOF/catchAsync';
import httpStatus from 'http-status';
import pickKeys from '../../../shared/utilities/pickKeys';
import { paginationFields } from '../../../shared/constants/pagination.constants';
import sendResponse from '../../../shared/utilities/sendResponse';
import { IAcademicSemester } from './semester.interface';
import { calculatePagination } from '../../../shared/helpers/paginationHelper';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const semester = req.body;
  const result = await semesterService.createSemesterToDB(semester);
  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'User created successfully',
    data: result,
  });
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pickKeys(req.query, paginationFields);
  const options = calculatePagination(paginationOptions);
  const { meta, data } = await semesterService.getAllSemesterFromDB(options);
  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters retrieved successfully',
    meta,
    data,
  });
});

export default { createSemester, getAllSemester };
