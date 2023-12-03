import { TAcademicDepartment } from './acdDepartment.interface';
import { AcademicDepartment } from './acdDepartment.model';

const createAcdDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  // one way to check uniqueness
  /* const isDptExist = await AcademicDepartment.findOne({ name: payload.name });
  if (isDptExist) {
    throw new Error('Department already exist');
  } */
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcdDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFauclty');
  return result;
};

const getSingleAcdDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFauclty'
  );
  return result;
};

const updateSingleAcdDepartmentFromDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
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

export const AcademicDepartmentSerices = {
  updateSingleAcdDepartmentFromDB,
  getAllAcdDepartmentsFromDB,
  getSingleAcdDepartmentFromDB,
  createAcdDepartmentIntoDB,
};
