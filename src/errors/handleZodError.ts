import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErroReturn } from '../interface/error';

const handleZodError = (err: ZodError): TGenericErroReturn => {
  const statusCode = 400;
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  return {
    statusCode,
    message: ' validation error',
    errorSources,
  };
};

export default handleZodError;
