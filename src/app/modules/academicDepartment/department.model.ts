import { Schema, model } from 'mongoose';
import { DepartmentModel, IDepartment } from './department.interface';

const DepartmentSchema = new Schema<IDepartment>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Department = model<IDepartment, DepartmentModel>('Department', DepartmentSchema);
