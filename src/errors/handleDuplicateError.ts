import mongoose from 'mongoose';
import { TErrorSources, TGenericErroReturn } from '../interface/error';

const handleDucplicateError = (err: any): TGenericErroReturn => {
  const mathc = err.message.match(/"([^"]*)"/);
  const extractedMessage = mathc && mathc[1];
  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exist`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid id',
    errorSources,
  };
};

export default handleDucplicateError;
