import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicFaculty } from './academicFaculty.interface';
import httpStatus from 'http-status';
import { AcademicFacultyServices } from './academicFaculty.services';
import { AcademicFacultyModel } from './academicFaculty.model';
import { Error } from 'mongoose';
import { academicFacultySearchableField } from './academicfaculty.constants';
import { paginationFieldOptions } from '../../../constants/pagination';
import pick from '../../../shared/pick';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { title } = req.body;

  const existingFaculty = await AcademicFacultyModel.findOne({ title });
  if (existingFaculty) {
    throw new Error('Faculty title already exists');
  }

  const result = await AcademicFacultyServices.createFaculty({ title });
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create academic faculty successful!',
    data: result,
  });
});

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filterFaculty = pick(req.query, academicFacultySearchableField);
  const paginationOption = pick(req.query, paginationFieldOptions);

  const result = await AcademicFacultyServices.getAllFaculty(
    filterFaculty,
    paginationOption
  );

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty data get successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicFacultyServices.getSingleFaculty(id);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Semester data get successfully !',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const existingFaculty = await AcademicFacultyModel.findOne({
    title: updatedData.title,
  });
  if (existingFaculty) {
    throw new Error('Faculty title already exists');
  }

  const result = await AcademicFacultyServices.updateFaculty(id, updatedData);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Semester successfully !',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicFacultyServices.deleteFaculty(id);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete Semester successfully !',
    data: result,
  });
});

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
