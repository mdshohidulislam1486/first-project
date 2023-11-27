/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
// import studentZodSchema from './student.zod.validation';
// import studentSchema from './student.joi.validation';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDb();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student are retirved  successfully',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};
const getSingleStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentsFromDb(studentId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Students found ',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};
const deleteSingleStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteSingleStudentsFromDb(studentId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Students deleted  successfully',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};
export const StudentControllers = {
  getAllStudents,
  getSingleStudents,
  deleteSingleStudents,
};
