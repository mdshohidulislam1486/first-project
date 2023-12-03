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

  middleName: z.string().optional(),

  lastName: z.string().refine((value) => /^[A-Za-z]+$/.test(value), {
    message: 'Last name must contain only letters',
  }),
});
const updateUserNameSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),

  middleName: z.string().optional(),

  lastName: z.string().optional(),
});

const guardianSchema = z.object({
  fatherName: z.string(),
  motherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
});
const updateGuardianSchema = z.object({
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
});

const localGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});
const updateLocalGuardianSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
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
      academicDepartment: z.string(),
      avatar: z.string(),
    }),
  }),
});
const updateStudentValidation = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameSchema,
      gender: z.enum(['male', 'female', 'others']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      cotactNo: z.string().optional(),
      emergencyContact: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'O+', 'O-', 'AB-'])
        .optional(),
      presentAdrres: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianSchema.optional(),
      localGuardian: updateLocalGuardianSchema.optional(),
      profileImage: z.string().optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      avatar: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidation,
  updateStudentValidation,
};
