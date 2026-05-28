import { Response } from "express";

interface ApiResponseOptions<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
}

export const apiResponse = <T>(
  res: Response,
  options: ApiResponseOptions<T>
) => {
  return res.status(options.statusCode).json({
    success: options.success,
    message: options.message,
    data: options.data || null
  });
};