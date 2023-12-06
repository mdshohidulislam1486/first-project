/* eslint-disable @typescript-eslint/no-explicit-any */
import { StudentServices } from './student.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import cathcAsync from '../../utils/catchAsync';
// import studentZodSchema from './student.zod.validation';
// import studentSchema from './student.joi.validation';

const getAllStudents = cathcAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDb(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student are retirved  successfully',
    data: result,
  });
});

const getSingleStudents = cathcAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentsFromDb(studentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Students found ',
    data: result,
  });
});
const deleteSingleStudents = cathcAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteSingleStudentsFromDb(studentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Students deleted  successfully',
    data: result,
  });
});
const updateSingleStudents = cathcAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateSingleStudentsIntoDb(
    studentId,
    student
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Students updated  successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  updateSingleStudents,
  getSingleStudents,
  deleteSingleStudents,
};
