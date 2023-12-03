import httpStatus from 'http-status';
import cathcAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartmentSerices } from './acdDepartment.serice';

const createAcademicDepartment = cathcAsync(async (req, res) => {
  const result = await AcademicDepartmentSerices.createAcdDepartmentIntoDB(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department is created successfully',
    data: result,
  });
});
const getAllAcademicDepartments = cathcAsync(async (req, res) => {
  const result = await AcademicDepartmentSerices.getAllAcdDepartmentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Departments found successfuly',
    data: result,
  });
});

const getSingleAcademicDepartment = cathcAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result = await AcademicDepartmentSerices.getSingleAcdDepartmentFromDB(
    departmentId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Found Single department',
    data: result,
  });
});

const updateSingleAcademicDepartment = cathcAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentSerices.updateSingleAcdDepartmentFromDB(
      departmentId,
      req.body
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department updated successfully',
    data: result,
  });
});

export const AcademicDeparmentControllers = {
  createAcademicDepartment,
  updateSingleAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
};
