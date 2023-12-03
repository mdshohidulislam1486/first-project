import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './acdFaculty.model';

const createAcdFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcdFacultiesFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const getSingleAcdFacultiesFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateSingleAcdFacultiesFromDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>
) => {
  const result = await AcademicFaculty.findOneAndUpdate(
    {
      _id: id,
    },
    payload,
    {
      new: true,
    }
  );
  return result;
};

export const AcademicFacultySerices = {
  updateSingleAcdFacultiesFromDB,
  getAllAcdFacultiesFromDB,
  getSingleAcdFacultiesFromDB,
  createAcdFacultyIntoDB,
};
