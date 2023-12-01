export type TMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
export type TAcdSemestrName = 'Autumn' | 'Summar' | 'Fall';
export type TAcdSemestrCode = '01' | '02' | '03';
export type TAcademicSemester = {
  name: TAcdSemestrName;
  code: TAcdSemestrCode;
  year: string;
  startMonth: TMonth;
  endMonth: TMonth;
};

export type TacademicSemesterNameCodeMapper = {
  [key: string]: string;
};
