import { ArgumentsHost, BadGatewayException } from '@nestjs/common';
import { Response } from 'express';
import { GlobalError } from 'src/infra/types/error.type';

export function authGuardValidationExceptionFilter(
  exception: BadGatewayException,
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
