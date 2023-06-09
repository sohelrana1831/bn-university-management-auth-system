import { ZodError } from 'zod';
import { IGenericErrorResponse } from '../interface/common';
import { IGenericErrorMessage } from '../interface/error';

const handelZodError = (err: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = err.issues.map(issue => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation error',
    errorMessage: errors,
  };
};

export default handelZodError;
