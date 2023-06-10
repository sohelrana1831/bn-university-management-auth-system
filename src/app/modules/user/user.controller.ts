import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await UserServices.createUser(user);

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

export const UserController = { createUser };
