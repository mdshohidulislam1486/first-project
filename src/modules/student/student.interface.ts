import { Model, Types } from 'mongoose';

export type TGuardian = {
  fatherName: string;
  motherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
};

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  email: string;
  gender: 'male' | 'female' | 'others';
  avatar: string;
  dateOfBirth?: Date;
  password: string;
  cotactNo: string;
  emergencyContact: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'O+' | 'O-' | 'AB-';
  presentAdrres: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
  // Use `Types.ObjectId` in document interface...
};

// for static
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

// for instance method
/* export type StudentMethods = {
  isUserExist(id: string): Promise<TStudent | null>;
}; */

/* export type TStudentModel = Model<
  TStudent,
  Record<string, never>,
  StudentMethods
>; */
