import { z } from 'zod';
import { semesterMonths, semestercodes, semesters } from './semester.constants';

const createAcadSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(semesters as [string, ...string[]], {
      required_error: "Title is required ('Autumn' | 'Summer' | 'Fall')",
    }),
    year: z.number({ required_error: 'semester year is required' }),
    code: z.enum(semestercodes as [string, ...string[]]),
    startMonth: z.enum(semesterMonths as [string, ...string[]], {
      required_error: 'semester startMonth is required',
    }),
    endMonth: z.enum(semesterMonths as [string, ...string[]], {
      required_error: 'semester endMonth is required',
    }),
  }),
});

export default {
  createAcadSemesterZodSchema,
};
