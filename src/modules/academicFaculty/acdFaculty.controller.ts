import httpStatus from 'http-status';
import cathcAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultySerices } from './acdFaculty.service';

const createAcademicFaculty = cathcAsync(async (req, res) => {
  const result = await AcademicFacultySerices.createAcdFacultyIntoDB(req.body);

  console.log(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is created successfully',
    data: result,
  });
});
const getAllAcademicFaculties = cathcAsync(async (req, res) => {
  const result = await AcademicFacultySerices.getAllAcdFacultiesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Faculties found successfuly',
    data: result,
  });
});

const getSingleAcademicFaculties = cathcAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultySerices.getSingleAcdFacultiesFromDB(
    facultyId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Found Single Faculty',
    data: result,
  });
});

const updateSingleAcademicFaculties = cathcAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultySerices.updateSingleAcdFacultiesFromDB(
    facultyId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  updateSingleAcademicFaculties,
  getAllAcademicFaculties,
  getSingleAcademicFaculties,
};
