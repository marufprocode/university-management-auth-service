import { z } from 'zod';

const createAndUpdateFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Faculty Title is required',
    }),
  }),
});

export default { createAndUpdateFacultyZodSchema };
