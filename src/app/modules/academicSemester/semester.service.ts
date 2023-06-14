import ApiError from '../../../errors/errors.apiError';
import { getSearchAndFiltersCondition } from '../../../shared/helpers/getSearchAndFiltersCondition';
import { IPaginationOptions, IPaginationResponse } from '../../../shared/interfaces/paginaton';
import { semesterSearchableFields, semestercodesMapper } from './semester.constants';
import { IAcademicSemester, ISemesterSearchAndFilters } from './semester.interface';
import { AcademicSemester } from './semester.model';

type returnType = Promise<IAcademicSemester | null>;

const createSemesterToDB = async (payload: IAcademicSemester): returnType => {
  if (semestercodesMapper[payload.title] !== payload.code) {
    throw new ApiError(400, 'Semester code does not match');
  }
  const result = await AcademicSemester.create(payload);
  if (!result) {
    throw new ApiError(400, 'Failed to create Semester');
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

export default { createSemesterToDB, getAllSemesterFromDB };
