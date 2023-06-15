import { Request, Response } from 'express';
import semesterService from './semester.service';
import catchAsync from '../../../shared/HOF/catchAsync';
import httpStatus from 'http-status';
import pickKeys from '../../../shared/utilities/pickKeys';
import { paginationFields } from '../../../shared/constants/pagination.constants';
import sendResponse from '../../../shared/utilities/sendResponse';
import { IAcademicSemester } from './semester.interface';
import { calculatePagination } from '../../../shared/helpers/paginationHelper';
import { semesterSearchAndFiltersleFields } from './semester.constants';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const semester = req.body;
  const result = await semesterService.createSemesterToDB(semester);
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pickKeys(req.query, paginationFields);
  const formattedPaginationOptions = calculatePagination(paginationOptions);
  const searchAndFilters = pickKeys(req.query, semesterSearchAndFiltersleFields);
  const { meta, data } = await semesterService.getAllSemesterFromDB(
    searchAndFilters,
    formattedPaginationOptions
  );
  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters retrieved successfully',
    meta,
    data,
  });
});

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await semesterService.getSingleSemesterFromDB(id);
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester retrieved successfully !',
    data: result,
  });
});
const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await semesterService.updateSemesterToDB(id, req.body);
  sendResponse<IAcademicSemester | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Updated Successfully !',
    data: result,
  });
});

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await semesterService.deleteSemester(id);

  sendResponse<IAcademicSemester | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester deleted successfully!',
    data: result,
  });
});

export default {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
