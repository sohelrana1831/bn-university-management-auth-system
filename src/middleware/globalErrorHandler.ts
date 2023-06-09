/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import config from '../config';
import { IGenericErrorMessage } from '../interface/error';
import handelValidationError from '../errors/handelValidationError';
import ApiError from '../errors/ApiError';
import { errorLogger } from '../shared/logger';
import { ZodError } from 'zod';
import handelZodError from '../errors/handelZodError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.node_env === 'development'
    ? console.log(`💣 globalErrorHandler`, error)
    : errorLogger.error(`💣globalErrorHandler`, error);
  let statusCode = 500;
  let message = 'something went wrong !';
  let errorMessage: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedErrorMessage = handelValidationError(error);
    statusCode = simplifiedErrorMessage.statusCode;
    message = simplifiedErrorMessage.message;
    errorMessage = simplifiedErrorMessage.errorMessage;
  } else if (error instanceof ZodError) {
    const simplifiedZodErrorMessage = handelZodError(error);
    statusCode = simplifiedZodErrorMessage.statusCode;
    message = simplifiedZodErrorMessage.message;
    errorMessage = simplifiedZodErrorMessage.errorMessage;
  } else if (error instanceof Error) {
    message = error.message;
    errorMessage = error.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : [];
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    errorMessage = error.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.node_env !== 'production' ? error?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
