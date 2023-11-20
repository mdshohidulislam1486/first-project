export type Guardian = {
  fatherName: string;
  motherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
};

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export type Student = {
  id: string;
  name: UserName;
  email: string;
  gender: 'male' | 'female';
  avatar: string;
  dateOfBirth?: string;
  cotactNo: string;
  emergencyContact: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'O+' | 'O-' | 'AB-';
  presentAdrres: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardina: LocalGuardian;
  profileImage?: string;
  isActive: 'active' | 'blocked';
  // Use `Types.ObjectId` in document interface...
};
