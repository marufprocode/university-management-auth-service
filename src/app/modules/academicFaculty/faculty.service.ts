import httpStatus from 'http-status';
import ApiError from '../../../errors/errors.apiError';
import { IFaculty, IFacultysearchAndFilters } from './faculty.interface';
import { AcademicFaculty } from './faculty.model';
import { IPaginationOptions, IPaginationResponse } from '../../../shared/interfaces/paginaton';
import { getSearchAndFiltersCondition } from '../../../shared/helpers/getSearchAndFiltersCondition';
import { facultiesSearchable } from './faculty.constants';

const createFacultyToDB = async (payload: IFaculty): Promise<IFaculty | null> => {
  const result = await AcademicFaculty.create(payload);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Faculty');
  }
  return result;
};

const getAllFaclutiesFromDB = async (
  searchAndFilters: IFacultysearchAndFilters,
  paginationOpt: IPaginationOptions
): Promise<IPaginationResponse<IFaculty[]>> => {
  const { page, limit, skip, sort } = paginationOpt;
  const conditions = getSearchAndFiltersCondition(
    searchAndFilters as { [Type: string]: string },
    facultiesSearchable
  );
  const result = await AcademicFaculty.find(conditions).sort(sort).skip(skip).limit(limit);
  const total = await AcademicFaculty.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
      sort,
    },
    data: result,
  };
};

const getSingleFacultyFromDB = async (id: string): Promise<IFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateFacultyToDB = async (id: string, data: Partial<IFaculty>): Promise<IFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteFacultyFromDB = async (id: string): Promise<IFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndRemove(id);
  return result;
};

export default {
  createFacultyToDB,
  getAllFaclutiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyToDB,
  deleteFacultyFromDB,
};
