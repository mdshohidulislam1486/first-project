import Joi from 'joi';
const userNameSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .max(20)
    .pattern(/^[A-Z][a-z]*$/)
    .message(
      'First name must start with a capital letter and contain only letters'
    ),

  middleName: Joi.string(),

  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/)
    .message('Last name must contain only letters'),
});

const guardianSchema = Joi.object({
  fatherName: Joi.string().required(),
  motherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
});

const localGuardianSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const studentSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameSchema.required(),
  gender: Joi.string().valid('male', 'female', 'others').required(),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencyContact: Joi.string().required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'O+',
    'O-',
    'AB-'
  ),
  presentAddress: Joi.string(),
  permanentAddress: Joi.string(),
  guardian: guardianSchema.required(),
  localGuardian: localGuardianSchema.required(),
  profileImage: Joi.string(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentSchema;
