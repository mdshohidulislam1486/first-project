/* eslint-disable @typescript-eslint/no-explicit-any */
// import studentZodSchema from '../student/student.zod.validation';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import cathcAsync from '../../utils/catchAsync';
import { AcdSemesterServices } from './acdSemester.service';
import { Request, Response } from 'express';

const createAcdSemester = cathcAsync(async (req: Request, res: Response) => {
  const result = await AcdSemesterServices.createAcdSemesterIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic semester is created succssfully',
    data: result,
  });
});

const getAllSemester = cathcAsync(async (req: Request, res: Response) => {
  const result = await AcdSemesterServices.getAllSemesterFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Semester retrived successfullly ',
    data: result,
  });
});

const getSingleSemester = cathcAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcdSemesterServices.getSingleSemesterFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student Found with this id  ',
    data: result,
  });
});

const updateSingleSemester = cathcAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await AcdSemesterServices.updateSingleSemesterIntoDB(
    id,
    payload
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student updated Successfully',
    data: result,
  });
});

export const AcdSemesterController = {
  createAcdSemester,
  getAllSemester,
  getSingleSemester,
  updateSingleSemester,
};
