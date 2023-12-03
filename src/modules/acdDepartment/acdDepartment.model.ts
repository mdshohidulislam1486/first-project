import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './acdDepartment.interface';
import { AppError } from '../../errors/AppError';

const academicDepartmentShcema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFauclty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  }
);

academicDepartmentShcema.pre('save', async function (next) {
  // const isDptExist = await this.model.findOne({ name: this.name }); // is also valid it will give you a error on typescript
  const isDptExist = await AcademicDepartment.findOne({ name: this.name });
  if (isDptExist) {
    throw new AppError(404, 'Department already exist');
  }
  next();
});

academicDepartmentShcema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDptExist = await AcademicDepartment.findOne(query);
  if (!isDptExist) {
    throw new AppError(404, "Department does't exist");
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentShcema
);
