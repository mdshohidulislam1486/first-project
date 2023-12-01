import {
  TAcdSemestrCode,
  TAcdSemestrName,
  TMonth,
  TacademicSemesterNameCodeMapper,
} from './academicSemester.interface';

export const months: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const AcademicSemesterName: TAcdSemestrName[] = [
  'Autumn',
  'Summar',
  'Fall',
];
export const AcademicSemesterCode: TAcdSemestrCode[] = ['01', '02', '03'];

export const academicSemesterNameCodeMapper: TacademicSemesterNameCodeMapper = {
  Autumn: '01',
  Summar: '02',
  Fall: '03',
};
