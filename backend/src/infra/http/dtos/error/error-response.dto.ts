import { BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ValidationError } from 'class-validator';

export class ErrorResponseDto {
  constructor(private readonly error: unknown) {
    if (this.error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Prisma.PrismaClientKnownRequestError(
        this.error.message,
        this.error,
      );
    } else if (this.error instanceof Prisma.PrismaClientValidationError) {
      throw new Prisma.PrismaClientValidationError(this.error.message);
    } else if (
      Array.isArray(this.error) &&
      this.error.every((item) => item instanceof ValidationError)
    ) {
      const validationErrors = this.error as ValidationError[];
      const formattedErrors = this.formatValidationErrors(validationErrors);
      throw new BadRequestException(formattedErrors);
    }
  }

  private formatValidationErrors(
    errors: ValidationError[],
  ): Record<string, string[]> {
    const formattedErrors: Record<string, string[]> = {};

    errors.forEach((error) => {
      const property = error.property;
      const constraints = Object.values(error.constraints || {});

      formattedErrors[property] = constraints;
    });

    return formattedErrors;
  }
}
