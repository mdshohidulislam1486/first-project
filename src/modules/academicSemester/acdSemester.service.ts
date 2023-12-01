import { TAcademicSemester } from './academicSemester.interface';
import { academicSemesterNameCodeMapper } from './acdSemester.const';
import { AcademicSemester } from './acdSemester.model';

const createAcdSemesterIntoDB = async (payload: TAcademicSemester) => {
  // semester naem ---> semester code is accurate

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw Error('Use Correct Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemesterFromDB = async () => {
  const result = await AcademicSemester.find({});
  return result;
};

const getSingleSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findOne({ _id: id });
  return result;
};

const updateSingleSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw Error('Use Correct Code');
  }
  const result = await AcademicSemester.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

export const AcdSemesterServices = {
  createAcdSemesterIntoDB,
  getAllSemesterFromDB,
  getSingleSemesterFromDB,
  updateSingleSemesterIntoDB,
};
