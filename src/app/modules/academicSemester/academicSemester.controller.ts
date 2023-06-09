import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterServices } from './academicSemester.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...payload } = req.body;
    const result = await AcademicSemesterServices.createSemester(payload);
    next();
    // res.status(200).json({
    //   success: true,
    //   message: 'Create academic semester successful!',
    //   data: result,
    // });

    sendResponse(res, {
      stateCode: httpStatus.OK,
      success: true,
      message: 'Create academic semester successful!',
      data: result,
    });
  }
);

export const AcademicSemesterController = {
  createSemester,
};
