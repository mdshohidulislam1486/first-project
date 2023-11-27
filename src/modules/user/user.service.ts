import config from '../../config';
import { Student } from '../student.model';
import { TStudent } from '../student/student.interface';
import { Tuser } from './user.interface';

import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create user object
  const userData: Partial<Tuser> = {};
  //if no pass use default pass
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'student';
  // set manually generated id
  userData.id = '2020100002';
  // create a userData
  const newUser = await User.create(userData);

  // create  a student
  if (Object.keys(newUser).length) {
    // set id, _id as userData
    studentData.id = newUser.id;
    studentData.user = newUser._id; // reference _id
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserSerices = {
  createStudentIntoDB,
};
