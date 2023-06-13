import ApiError from '../../../errors/errors.apiError';
import {
  IPaginationOptionsResult,
  IPaginationResponse,
} from '../../../shared/interfaces/paginaton';
import { semestercodesMapper } from './semester.constants';
import { IAcademicSemester } from './semester.interface';
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
  paginationOpt: IPaginationOptionsResult
): Promise<IPaginationResponse<IAcademicSemester[]>> => {
  const { page, limit, skip } = paginationOpt;
  const result = await AcademicSemester.find().skip(skip).limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export default { createSemesterToDB, getAllSemesterFromDB };
