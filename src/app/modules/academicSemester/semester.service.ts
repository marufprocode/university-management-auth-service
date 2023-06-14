import httpStatus from 'http-status';
import ApiError from '../../../errors/errors.apiError';
import { getSearchAndFiltersCondition } from '../../../shared/helpers/getSearchAndFiltersCondition';
import { IPaginationOptions, IPaginationResponse } from '../../../shared/interfaces/paginaton';
import { semesterSearchableFields, semestercodesMapper } from './semester.constants';
import { IAcademicSemester, ISemesterSearchAndFilters } from './semester.interface';
import { AcademicSemester } from './semester.model';

type returnType = Promise<IAcademicSemester | null>;

const createSemesterToDB = async (payload: IAcademicSemester): returnType => {
  if (semestercodesMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Semester code does not match');
  }
  const result = await AcademicSemester.create(payload);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Semester');
  }
  return result;
};

const getAllSemesterFromDB = async (
  searchAndFilters: ISemesterSearchAndFilters,
  paginationOpt: IPaginationOptions
): Promise<IPaginationResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sort } = paginationOpt;
  const conditions = getSearchAndFiltersCondition(
    searchAndFilters as Record<string, string>,
    semesterSearchableFields
  );
  const result = await AcademicSemester.find(conditions).sort(sort).skip(skip).limit(limit);
  const total = await AcademicSemester.countDocuments();
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
const getSingleSemesterFromDB = async (id: string): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateSemesterToDB = async (
  id: string,
  data: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (data.title && data.code && semestercodesMapper[data.title] !== data.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }
  const result = await AcademicSemester.findByIdAndUpdate(id, data, { new: true });
  return result;
};
const deleteSemester = async (id: string): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndRemove(id);
  return result;
};

export default {
  createSemesterToDB,
  getAllSemesterFromDB,
  getSingleSemesterFromDB,
  updateSemesterToDB,
  deleteSemester,
};
