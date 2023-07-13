import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  //  create user instance methods
  const user = new User();

  //   check user exist
  //   const isUserExist = await User.findOne(
  //     { id },
  //     { id: 1, password: 1, needsPasswordChange: 1 }
  //   ).lean();

  //   Access instance methods
  const isUserExist = await user.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User dose not exist!');
  }

  if (
    isUserExist.password &&
    !(await user.isPasswordMatch(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //   access token & refresh token
  // const accessToken = jwt.sign(
  //   {
  //     id: isUserExist?.id,
  //     role: isUserExist?.role,
  //   },
  //   config.jwt.secret as Secret,
  //   {
  //     expiresIn: config.jwt.expire_in,
  //   }
  // );

  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expire_in as string
  );

  // const refreshToken = jwt.sign(
  //   {
  //     id: isUserExist?.id,
  //     role: isUserExist?.role,
  //   },
  //   config.jwt.refresh_secret as Secret,
  //   {
  //     expiresIn: config.jwt.refresh_expire_in,
  //   }
  // );
  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expire_in as string
  );

  return {
    needsPasswordChange,
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }
  const user = new User();
  const { userId } = verifiedToken;

  // tumi delete hye gso  kintu tumar refresh token ase
  // checking deleted user's refresh token
  //  create user instance methods

  const isUserExist = await user.isUserExist(userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expire_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthServices = {
  loginUser,
  refreshToken,
};
