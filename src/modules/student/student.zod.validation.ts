import { z } from 'zod';

const userNameSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z][a-z]*$/.test(value), {
      message:
        'First name must start with a capital letter and contain only letters',
    }),

  middleName: z.string(),

  lastName: z.string().refine((value) => /^[A-Za-z]+$/.test(value), {
    message: 'Last name must contain only letters',
  }),
});

const guardianSchema = z.object({
  fatherName: z.string(),
  motherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
});

const localGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const createStudentValidation = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameSchema,
      gender: z.enum(['male', 'female', 'others']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      cotactNo: z.string(),
      emergencyContact: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'O+', 'O-', 'AB-']),
      presentAdrres: z.string(),
      permanentAddress: z.string(),
      guardian: guardianSchema,
      localGuardian: localGuardianSchema,
      profileImage: z.string(),
      admissionSemester: z.string(),
      avatar: z.string(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidation,
};
