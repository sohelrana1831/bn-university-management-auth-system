import { Response } from 'express';
type IApiResponse<T> = {
  stateCode: number;
  success: boolean;
  message?: string | null;
  data?: T | null;
};
const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const responseData: IApiResponse<T> = {
    stateCode: data.stateCode,
    success: data.success,
    message: data.message || null,
    data: data.data || null,
  };
  res.status(data.stateCode).json(responseData);
};

export default sendResponse;
