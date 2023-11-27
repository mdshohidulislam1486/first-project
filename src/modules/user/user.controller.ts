/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { UserSerices } from './user.service';
// import studentZodSchema from '../student/student.zod.validation';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student: studentData } = req.body;
    // const zodValidation = studentZodSchema.parse(studentData);
    const result = await UserSerices.createStudentIntoDB(password, studentData);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student added successfully',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const UserControllers = {
  createStudent,
};
