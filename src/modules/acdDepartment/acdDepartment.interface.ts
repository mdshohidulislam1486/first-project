import { Types } from 'mongoose';

export type TAcademicDepartment = {
  name: string;
  academicFauclty: Types.ObjectId;
};
