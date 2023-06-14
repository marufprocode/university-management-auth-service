import {
  AcademicSemesterCodes,
  AcademicSemesterMonths,
  AcademicSemesterTitles,
} from './semester.interface';

export const semesterMonths: AcademicSemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const semesters: AcademicSemesterTitles[] = ['Autumn', 'Summer', 'Fall'];

export const semestercodes: AcademicSemesterCodes[] = ['01', '02', '03'];

export const semestercodesMapper: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const semesterSearchAndFiltersleFields = [
  'search',
  'title',
  'code',
  'year',
];
export const semesterSearchableFields = [
  'title',
  'code',
];
