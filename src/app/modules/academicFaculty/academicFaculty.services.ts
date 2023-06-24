import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/pagination';
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.interface';
import { AcademicFacultyModel } from './academicFaculty.model';
import { academicFacultySearchableField } from './academicfaculty.constants';

const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFacultyModel.create(payload);
  return result;
};

const getAllFaculty = async (
  filterFaculty: IAcademicFacultyFilters,
  paginationOption: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { searchTerm, ...filterData } = filterFaculty;
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: academicFacultySearchableField.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOption);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await AcademicFacultyModel.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicFacultyModel.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFacultyModel.findById(id);
  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  // check title code valid
  const result = await AcademicFacultyModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};

const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFacultyModel.findByIdAndDelete({ _id: id });
  return result;
};

export const AcademicFacultyServices = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
