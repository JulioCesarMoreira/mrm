import { httpExceptionFilter } from '@infra/http/http-exception/http-exception.filter';
import {
  prismaClientKnowExceptionFilter,
  prismaClientValidationExceptionFilter,
} from '@infra/service/database/prisma/prisma-exception/prisma-exception.filter';
import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    if (exception instanceof HttpException) {
      httpExceptionFilter(exception, host);
    }

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      prismaClientKnowExceptionFilter(exception, host);
    }

    if (exception instanceof Prisma.PrismaClientValidationError) {
      prismaClientValidationExceptionFilter(exception, host);
    }
  }
}
