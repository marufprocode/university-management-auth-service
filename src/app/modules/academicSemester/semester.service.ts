import ApiError from '../../../errors/errors.apiError';
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

export default { createSemesterToDB };
