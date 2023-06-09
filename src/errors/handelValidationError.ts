import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interface/error';
import { IGenericErrorResponse } from '../interface/common';

// Don't know why error this code

// const handelValidationError = (
//   err: mongoose.Error.ValidationError
// ): IGenericErrorResponse => {
//   const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
//     (el: mongoose.Error.ValidationError | mongoose.Error.CastError) => {
//       return {
//         path: el.path,
//         message: el.message,
//       }
//     }
//   )

//   const statusCode = 400
//   return {
//     statusCode,
//     message: 'Validation Error',
//     errorMessage: errors,
//   }
// }

const handelValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el.path,
        message: el.message,
      };
    }
  );

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: errors,
  };
};

export default handelValidationError;
