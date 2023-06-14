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

const validateSemesterQuerySchema = z.object({
  query: z
    .object({
      page: z
        .string()
        .refine(val => (isNaN(Number(val)) || !Number.isInteger(Number(val)) ? false : true), {
          message: 'invalid page query',
        })
        .optional(),
      limit: z
        .string()
        .refine(val => (isNaN(Number(val)) || !Number.isInteger(Number(val)) ? false : true), {
          message: 'invalid limit query',
        })
        .optional(),
      sortBy: z.enum(['asc', 'desc']).optional(),
      sortOrder: z.enum(['asc', 'desc']).optional(),
      search: z.string().optional(),
      title: z.string().optional(),
      code: z.enum(semestercodes as [string, ...string[]]).optional(),
      year: z
        .string()
        .refine(val => (isNaN(Number(val)) || !Number.isInteger(Number(val)) ? false : true), {
          message: 'invalid year query',
        })
        .optional(),
    })
    .catchall(
      z.unknown().refine(() => false, {
        message: 'Invalid query parameter',
      })
    ),
});

const updateAcadSemesterZodSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z
    .object({
      title: z.enum(semesters as [string, ...string[]]).optional(),
      year: z.number().optional(),
      code: z.enum(semestercodes as [string, ...string[]]).optional(),
      startMonth: z.enum(semesterMonths as [string, ...string[]]).optional(),
      endMonth: z.enum(semesterMonths as [string, ...string[]]).optional(),
    })
    .refine(
      data => {
        const { title, code } = data;
        return (title && code) || (!title && !code);
      },
      {
        message: 'Either both title and code should be provided or neither.',
        path: ['title', 'code'],
      }
    ),
});

export default {
  createAcadSemesterZodSchema,
  validateSemesterQuerySchema,
  updateAcadSemesterZodSchema,
};
