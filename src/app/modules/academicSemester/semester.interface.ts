import { Document, Model } from 'mongoose';

export type AcademicSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type AcademicSemesterTitles = 'Autumn' | 'Summer' | 'Fall';

export type AcademicSemesterCodes = '01' | '02' | '03';

export interface IAcademicSemester extends Document {
  title: AcademicSemesterTitles;
  year: number;
  code: AcademicSemesterCodes;
  startMonth: AcademicSemesterMonths;
  endMonth: AcademicSemesterMonths;
}

export type AcademicSemesterModel = Model<IAcademicSemester>;

export interface ISemesterSearchAndFilters {
  search?: string;
  title?: string;
  code?: string;
  year?: string;
}
