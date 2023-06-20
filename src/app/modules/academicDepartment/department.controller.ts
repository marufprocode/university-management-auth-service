import { Request, Response } from 'express';
import catchAsync from '../../../shared/HOF/catchAsync';
import departmentService from './department.service';
import sendResponse from '../../../shared/utilities/sendResponse';
import { IDepartment } from './department.interface';
import httpStatus from 'http-status';
import pickKeys from '../../../shared/utilities/pickKeys';
import { paginationFields } from '../../../shared/constants/pagination.constants';
import { calculatePagination } from '../../../shared/helpers/paginationHelper';
import { departmentSearchAndFilters } from './department.constants';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await departmentService.createDepartmentToDB(data);
  sendResponse<IDepartment>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Faculty created successfully',
    data: result,
  });
});

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pickKeys(req.query, paginationFields);
  const formattedPaginationOptions = calculatePagination(paginationOptions);
  const searchAndFilters = pickKeys(req.query, departmentSearchAndFilters);
  const { meta, data } = await departmentService.getAllDepartmentsFromDB(
    searchAndFilters,
    formattedPaginationOptions
  );
  sendResponse<IDepartment[] | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${data ? 'Departments data retrieved successfully' : 'No data found'}`,
    meta,
    data,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await departmentService.getSingleDepartmentFromDB(id);

  sendResponse<IDepartment | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${
      result ? 'Department info retrieved successfully !' : 'No Department found with this Id !'
    }`,
    data: result,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await departmentService.updateDepartmentToDB(id, req.body);

  sendResponse<IDepartment | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${
      result ? 'Department info Updated Successfully!' : 'Something went wrong, not updated!'
    }`,
    data: result,
  });
});
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await departmentService.deleteDepartmentFromDB(id);

  sendResponse<IDepartment | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${
      result ? 'Department deleted successfully!' : `No department found with id: ${id} to delete`
    }`,
    data: result,
  });
});

export default {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
