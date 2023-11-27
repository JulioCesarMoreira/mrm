import { ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { GlobalError } from 'src/infra/types/error.type';

interface ClassValidatorError {
  statusCode: number;
  message: { field: string; error: string }[];
  error: string;
}

export function httpExceptionFilter(
  exception: HttpException,
  host: ArgumentsHost,
): void {
  const ctx = host.switchToHttp();
  const response = ctx.getResponse<Response>();
  const status = exception.getStatus();

  const errorMessage = exception.getResponse() as ClassValidatorError;

  const error: GlobalError = {
    errorType: errorMessage.error,
    message: JSON.stringify(errorMessage.message),
  };

  response.status(status).send(error);
}
