import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constants';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import httpStatus from 'http-status';
const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  // check title code
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid title code!');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createSemester,
};
