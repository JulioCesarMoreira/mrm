import { ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

export function httpExceptionFilter(
  exception: HttpException,
  host: ArgumentsHost,
): void {
  const ctx = host.switchToHttp();
  const response = ctx.getResponse<Response>();
  const status = exception.getStatus();

  response.status(status).json(exception.getResponse());
}
