import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicDepartment } from './academicDepartment.interface';
import httpStatus from 'http-status';
import { AcademicDepartmentServices } from './academicDepartment.services';
import { academicDepartmentSearchableField } from './academicDepartment.constants';
import { paginationFieldOptions } from '../../../constants/pagination';
import pick from '../../../shared/pick';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;

  const result = await AcademicDepartmentServices.createDepartment(payload);
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create academic Department successful!',
    data: result,
  });
});

const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filterDepartment = pick(req.query, academicDepartmentSearchableField);
  const paginationOption = pick(req.query, paginationFieldOptions);

  const result = await AcademicDepartmentServices.getAllDepartment(
    filterDepartment,
    paginationOption
  );

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department data get successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicDepartmentServices.getSingleDepartment(id);
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Semester data get successfully !',
    data: result,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AcademicDepartmentServices.updateDepartment(
    id,
    updatedData
  );
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Semester successfully !',
    data: result,
  });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicDepartmentServices.deleteDepartment(id);
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete Semester successfully !',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
