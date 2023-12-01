/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserSerices } from './user.service';
// import studentZodSchema from '../student/student.zod.validation';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import cathcAsync from '../../utils/catchAsync';

const createStudent = cathcAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  // const zodValidation = studentZodSchema.parse(studentData);
  const result = await UserSerices.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student added successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
