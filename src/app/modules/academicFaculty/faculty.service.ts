import httpStatus from 'http-status';
import ApiError from '../../../errors/errors.apiError';
import { IFaculty } from './faculty.interface';
import { AcademicFaculty } from './faculty.model';

const createFacultyToDB = async (payload: IFaculty): Promise<IFaculty | null> => {
  const result = await AcademicFaculty.create(payload);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Faculty');
  }
  return result;
};

export default {
  createFacultyToDB,
};
