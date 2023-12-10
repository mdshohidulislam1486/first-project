import { z } from 'zod';

const PreRequisteCourValidationScheam = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourse: z.array(PreRequisteCourValidationScheam).optional(),
  }),
});
const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    isDeleted: z.boolean().optional().optional(),
    preRequisiteCourse: z.array(PreRequisteCourValidationScheam).optional(),
  }),
});

const FacultyWithCourseValidationScheam = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  FacultyWithCourseValidationScheam,
};
