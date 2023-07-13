import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthServices } from './auth.services';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import config from '../../../config';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AuthServices.loginUser(loginData);
  const { refreshToken, ...otherData } = result;

  // Set refreshToken into browser cookie
  const cookieOptions = {
    secure: config.node_env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  if ('refreshToken' in result) {
    delete result.refreshToken;
  }
  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successfully !',
    data: otherData,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthServices.refreshToken(refreshToken);

  // Set refreshToken into browser cookie
  const cookieOptions = {
    secure: config.node_env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successfully !',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
};
