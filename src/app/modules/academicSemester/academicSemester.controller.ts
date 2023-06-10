import { Request, Response } from 'express';
import { AcademicSemesterServices } from './academicSemester.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { paginationFieldOptions } from './../../../constants/pagination';
import pick from '../../../shared/pick';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemesterFilterableField } from './academicSemester.constants';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;
  const result = await AcademicSemesterServices.createSemester(payload);

  // res.status(200).json({
  //   success: true,
  //   message: 'Create academic semester successful!',
  //   data: result,
  // });

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create academic semester successful!',
    data: result,
  });
});

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const filterSemester = pick(req.query, academicSemesterFilterableField);
  const paginationOption = pick(req.query, paginationFieldOptions);

  const result = await AcademicSemesterServices.getAllSemester(
    filterSemester,
    paginationOption
  );

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester data get successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemesterServices.getSingleSemester(id);
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Semester data get successfully !',
    data: result,
  });
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AcademicSemesterServices.updateSemester(id, updatedData);
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Semester successfully !',
    data: result,
  });
});

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemesterServices.deleteSemester(id);
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete Semester successfully !',
    data: result,
  });
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
