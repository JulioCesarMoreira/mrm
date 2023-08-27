import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

export function prismaClientValidationExceptionFilter(
  exception: Prisma.PrismaClientValidationError,
  host: ArgumentsHost,
): void {
  const ctx = host.switchToHttp();
  const response = ctx.getResponse<Response>();

  response.status(400).json({
    message: 'One or more fields are incompatible with the schema database',
    stackError: exception.stack,
  });
}

export function prismaClientKnowExceptionFilter(
  exception: Prisma.PrismaClientKnownRequestError,
  host: ArgumentsHost,
): void {
  const ctx = host.switchToHttp();
  const response = ctx.getResponse<Response>();

  const status = getHttpStatusForPrismaError(exception.code);

  response.status(status).json({
    mysqlError: exception.code,
    field: exception.meta,
  });
}

function getHttpStatusForPrismaError(exceptionCode: string): number {
  switch (exceptionCode) {
    // Bad Request (400)
    case 'P1000':
    case 'P1001':
    case 'P1002':
    case 'P1003':
    case 'P1008':
    case 'P1009':
    case 'P1010':
    case 'P1011':
    case 'P1012':
    case 'P1013':
    case 'P1014':
    case 'P1015':
    case 'P1016':
    case 'P1017':
    case 'P2000':
    case 'P2001':
    case 'P2006':
    case 'P2007':
    case 'P2008':
    case 'P2009':
    case 'P2010':
    case 'P2011':
    case 'P2012':
    case 'P2013':
    case 'P2014':
    case 'P2015':
    case 'P2016':
    case 'P2017':
    case 'P2018':
    case 'P2019':
    case 'P2020':
    case 'P2021':
    case 'P2022':
    case 'P2023':
    case 'P2024':
    case 'P2025':
    case 'P2026':
    case 'P2027':
    case 'P2028':
    case 'P2030':
    case 'P2031':
    case 'P2033':
    case 'P2034':
    case 'P3000':
    case 'P3001':
    case 'P3002':
    case 'P3003':
    case 'P3004':
    case 'P3005':
    case 'P3006':
    case 'P3007':
    case 'P3008':
    case 'P3009':
    case 'P3010':
    case 'P3011':
    case 'P3012':
    case 'P3013':
    case 'P3014':
    case 'P3015':
    case 'P3016':
    case 'P3017':
    case 'P3018':
    case 'P3019':
    case 'P3020':
    case 'P3021':
    case 'P3022':
    case 'P4000':
    case 'P4001':
    case 'P4002':
    case 'P5000':
    case 'P5001':
    case 'P5002':
    case 'P5003':
    case 'P5004':
    case 'P5005':
    case 'P5006':
    case 'P5007':
    case 'P5008':
    case 'P5009':
    case 'P5010':
    case 'P5011':
    case 'P5012':
    case 'P5013':
    case 'P5014':
    case 'P5015':
      return HttpStatus.BAD_REQUEST;

    // Conflict (409)
    case 'P2002':
    case 'P2003':
    case 'P2004':
    case 'P2005':
      return HttpStatus.CONFLICT;

    // Internal Server Error (500) - Default
    default:
      return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
