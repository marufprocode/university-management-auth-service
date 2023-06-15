import httpStatus from 'http-status';
import catchAsync from '../../../shared/HOF/catchAsync';
import { IFaculty } from './faculty.interface';
import sendResponse from '../../../shared/utilities/sendResponse';
import facultyService from './faculty.service';
import { Request, Response } from 'express';
import pickKeys from '../../../shared/utilities/pickKeys';
import { paginationFields } from '../../../shared/constants/pagination.constants';
import { calculatePagination } from '../../../shared/helpers/paginationHelper';
import { facultiesSearchAndFilter } from './faculty.constants';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const facultyData = req.body;
  const result = await facultyService.createFacultyToDB(facultyData);
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Faculty created successfully',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pickKeys(req.query, paginationFields);
  const formattedPaginationOptions = calculatePagination(paginationOptions);
  const searchAndFilters = pickKeys(req.query, facultiesSearchAndFilter);
  const { meta, data } = await facultyService.getAllFaclutiesFromDB(
    searchAndFilters,
    formattedPaginationOptions
  );
  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties data retrieved successfully',
    meta,
    data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await facultyService.getSingleFacultyFromDB(id);

  sendResponse<IFaculty | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${
      result ? 'Faculty info retrieved successfully !' : 'No Faculty found with this Id !'
    }`,
    data: result,
  });
});
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await facultyService.updateFacultyToDB(id, req.body);

  sendResponse<IFaculty | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${
      result ? 'Faculty info Updated Successfully!' : 'Something went wrong, not updated!'
    }`,
    data: result,
  });
});
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await facultyService.deleteFacultyFromDB(id);

  sendResponse<IFaculty | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${
      result ? 'Semester deleted successfully!' : `No faculty found with id: ${id} to delete`
    }`,
    data: result,
  });
});

export default {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
