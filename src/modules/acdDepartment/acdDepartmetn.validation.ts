import { z } from 'zod';

const createAcdDepartmentValidatinSchema = z.object({
  body: z.object({
    name: z.string(),
    academicFauclty: z.string(),
  }),
});
const updateAcdDepartmentValidatinSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    academicFauclty: z.string().optional(),
  }),
});

export const AcdDepartmentValidation = {
  createAcdDepartmentValidatinSchema,
  updateAcdDepartmentValidatinSchema,
};
