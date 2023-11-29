import { ArgumentsHost } from '@nestjs/common';
import { BadRequestException } from '@src/error/CustomError';
import { Response } from 'express';
import { GlobalError } from 'src/infra/types/error.type';

export function badRequestExceptionFilter(
  exception: BadRequestException,
  host: ArgumentsHost,
): void {
  const ctx = host.switchToHttp();
  const response = ctx.getResponse<Response>();

  const error: GlobalError = {
    errorType: exception.name,
    message: exception.message,
  };

  response.status(400).send(error);
}
