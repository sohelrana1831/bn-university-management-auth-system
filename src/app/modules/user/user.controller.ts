import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { student, ...userData } = req.body;
    const result = await UserServices.createStudent(student, userData);

    // res.status(200).json({
    //   success: true,
    //   message: 'User create successfully',
    //   data: result,
    // });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User create successfully',
      data: result,
    });
    next();
  }
);

// const createFaculty = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { faculty, ...userData } = req.body;
//     const result = await UserServices.createFaculty(faculty, userData);

//     // res.status(200).json({
//     //   success: true,
//     //   message: 'User create successfully',
//     //   data: result,
//     // });

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Faculty create successfully',
//       data: result,
//     });
//     next();
//   }
// );

export const UserController = {
  createStudent,
  // createFaculty
};
