import { httpExceptionFilter } from '@infra/http/http-exception/http-exception.filter';
import {
  prismaClientKnowExceptionFilter,
  prismaClientValidationExceptionFilter,
} from '@infra/service/database/prisma/prisma-exception/prisma-exception.filter';
import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.error(exception);

    switch (true) {
      case exception instanceof HttpException:
        httpExceptionFilter(exception as HttpException, host);
        break;

      case exception instanceof Prisma.PrismaClientKnownRequestError:
        prismaClientKnowExceptionFilter(
          exception as Prisma.PrismaClientKnownRequestError,
          host,
        );
        break;

      case exception instanceof Prisma.PrismaClientValidationError:
        prismaClientValidationExceptionFilter(
          exception as Prisma.PrismaClientValidationError,
          host,
        );
        break;

      default:
        response.status(500).json({ message: 'Internal server error' });
    }
  }
}
