import { ArgumentsHost } from '@nestjs/common';
import { UnauthorizedErrorException } from '@src/error/CustomError';
import { Response } from 'express';
import { GlobalError } from 'src/infra/types/error.type';

export function authGuardValidationExceptionFilter(
  exception: UnauthorizedErrorException,
  host: ArgumentsHost,
): void {
  const ctx = host.switchToHttp();
  const response = ctx.getResponse<Response>();

  const error: GlobalError = {
    errorType: exception.name,
    message: exception.message,
  };

  response.status(401).json(error);
}
