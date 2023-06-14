import { Schema, model } from 'mongoose';
import { AcademicSemesterModel, IAcademicSemester } from './semester.interface';
import { semesterMonths, semestercodes, semesters } from './semester.constants';
import ApiError from '../../../errors/errors.apiError';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: semesters,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: semestercodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: semesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: semesterMonths,
    },
  },
  { timestamps: true }
);

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.exists({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    // Document with the same title and year already exists
    return next(new ApiError(409, `semester ${this.title} of year ${this.year} already exists`));
  }
  // Document does not exist, proceed with the save operation
  next();
});

academicSemesterSchema.pre('findOneAndRemove', async function (next) {
  const document = await this.model.findOne(this.getQuery());

  if (!document) {
    return next(new ApiError(409, `Academic semester not found`));
  }

  // Perform additional cleanup or execute specific actions before removing the document
  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'Semester',
  academicSemesterSchema
);
