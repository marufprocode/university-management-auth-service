import { getSearchAndFiltersCondition } from '../../../shared/helpers/getSearchAndFiltersCondition';
import { IPaginationOptions, IPaginationResponse } from '../../../shared/interfaces/paginaton';
import { departmentSearchable } from './department.constants';
import { IDepartment, IDepartmentSearchAndFilters } from './department.interface';
import { Department } from './department.model';

const createDepartmentToDB = async (payload: IDepartment): Promise<IDepartment | null> => {
  const result = (await Department.create(payload)).populate('academicFaculty');
  return result;
};

const getAllDepartmentsFromDB = async (
  searchAndFilters: IDepartmentSearchAndFilters,
  paginationOpt: IPaginationOptions
): Promise<IPaginationResponse<IDepartment[] | null>> => {
  const { page, limit, skip, sort } = paginationOpt;
  const conditions = getSearchAndFiltersCondition(
    searchAndFilters as { [Type: string]: string },
    departmentSearchable
  );
  const result = await Department.find(conditions).sort(sort).skip(skip).limit(limit);
  const total = await Department.countDocuments();
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

const getSingleDepartmentFromDB = async (id: string): Promise<IDepartment | null> => {
  const result = await Department.findById(id);
  return result;
};

const updateDepartmentToDB = async (
  id: string,
  data: Partial<IDepartment>
): Promise<IDepartment | null> => {
  const result = await Department.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  return result;
};

const deleteDepartmentFromDB = async (id: string): Promise<IDepartment | null> => {
  const result = await Department.findByIdAndRemove(id);
  return result;
};

export default {
  createDepartmentToDB,
  getAllDepartmentsFromDB,
  getSingleDepartmentFromDB,
  updateDepartmentToDB,
  deleteDepartmentFromDB,
};
