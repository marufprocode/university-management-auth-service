import { Model, Types } from 'mongoose';
import { IFaculty } from '../academicFaculty/faculty.interface';

export interface IDepartment extends Document {
  title: string;
  academicFaculty: Types.ObjectId | IFaculty;
}

export type DepartmentModel = Model<IDepartment, Record<string, unknown>>;

export interface IDepartmentSearchAndFilters {
  search?: string;
  title?: string;
}
