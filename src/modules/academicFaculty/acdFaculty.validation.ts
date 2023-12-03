import { z } from 'zod';

const createAcdFacultyValidatinSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});
const updateAcdFacultyValidatinSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});

export const AcdFacultyValidation = {
  createAcdFacultyValidatinSchema,
  updateAcdFacultyValidatinSchema,
};
