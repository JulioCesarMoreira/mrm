import { httpExceptionFilter } from '@infra/http/http-exception/http-exception.filter';
import {
  prismaClientKnowExceptionFilter,
  prismaClientValidationExceptionFilter,
} from '@infra/service/database/prisma/prisma-exception/prisma-exception.filter';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import {
  BadRequestException as BadRequestExceptionCustom,
  UnauthorizedErrorException,
} from '@src/error/CustomError';
import { Response } from 'express';
import { authGuardValidationExceptionFilter } from '../guard/auth-exception.filter';
import { badRequestExceptionFilter } from '@src/error/error-exception';

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

      case exception instanceof UnauthorizedErrorException:
        authGuardValidationExceptionFilter(
          exception as UnauthorizedErrorException,
          host,
        );
        break;

      case exception instanceof BadRequestExceptionCustom:
        badRequestExceptionFilter(exception as BadRequestExceptionCustom, host);
        break;

      case exception instanceof BadRequestException:
        badRequestExceptionFilter(exception as BadRequestExceptionCustom, host);
        break;

      default:
        response.status(500).send({ message: 'Internal server error' });
    }
  }
}
