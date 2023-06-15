import { Schema, model } from 'mongoose';
import { FacultyModel, IFaculty } from './faculty.interface';

const facultySchema = new Schema<IFaculty>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export const AcademicFaculty = model<IFaculty, FacultyModel>('Faculty', facultySchema);
