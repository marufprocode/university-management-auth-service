import { z } from 'zod';

const createAndUpdateFacultyZodSchema = z.object({
  body: z
    .object({
      title: z.string({
        required_error: 'Faculty Title is required',
      }),
    })
    .catchall(
      z.unknown().refine(() => false, {
        message: 'Invalid data received! Please provide valid faculty data.',
      })
    ),
});

export default { createAndUpdateFacultyZodSchema };
