/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';

const globalerrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statatusCode = 500;
  const message = err.message || 'Something went wrong';
  return res.status(statatusCode).json({
    success: false,
    message,
    error: err,
  });
};

export default globalerrorHandler;
