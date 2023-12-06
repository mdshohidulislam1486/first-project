/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDucplicateError from '../errors/handleDuplicateError';
import { AppError } from '../errors/AppError';

const globalerrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // settint default value
  let statusCode = 500;
  let message = 'Something went wrong';

  let erorrSource: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    erorrSource = simplifiedError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    (statusCode = simplifiedError?.statusCode),
      (message = simplifiedError?.message),
      (erorrSource = simplifiedError?.errorSources);
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    (statusCode = simplifiedError?.statusCode),
      (message = simplifiedError?.message),
      (erorrSource = simplifiedError?.errorSources);
  } else if (err?.code === 11000) {
    const simplifiedError = handleDucplicateError(err);
    (statusCode = simplifiedError?.statusCode),
      (message = simplifiedError?.message),
      (erorrSource = simplifiedError?.errorSources);
  } else if (err instanceof AppError) {
    (statusCode = err?.statusCode),
      (message = err?.message),
      (erorrSource = [
        {
          path: '',
          message: err?.message,
        },
      ]);
  } else if (err instanceof Error) {
    (message = err?.message),
      (erorrSource = [
        {
          path: '',
          message: err?.message,
        },
      ]);
  }

  // ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    erorrSource,
    // err,
    error: config.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default globalerrorHandler;
