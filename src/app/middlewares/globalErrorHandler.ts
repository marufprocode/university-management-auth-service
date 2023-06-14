/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { errorLogger } from '../../shared/logger/logger';
import { IGenericErrorMessage } from '../../errors/errors.interfaces';
import { ZodError } from 'zod';
import { Error } from 'mongoose';
import ApiError from '../../errors/errors.apiError';
import handleValidationError from '../../errors/errors.handleValidationError';
import handleZodError from '../../errors/errors.handleZodError';
import handleCastError from '../../errors/errors.handleCastError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // check if the error happened before in the console or logs the error
  config.env === 'development'
    ? console.error(`⛔ globalErrorHandler ~~`, error)
    : errorLogger.error(`⛔ globalErrorHandler ~~`, error);

  let statusCode = 500;
  let message = 'Internal Server Error!';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : null,
  });

  next();
};

export default globalErrorHandler;
