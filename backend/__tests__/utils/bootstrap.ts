import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { ValidationError } from 'class-validator';
import { AppModule } from 'src/app.module';
import { GlobalExceptionFilter } from 'src/infra/global-exception/global-exception.filter';

export async function bootstrap(
  CoreRepositoryProvider: unknown,
  InMemoryRepositoryProvider: unknown,
): Promise<INestApplication> {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(CoreRepositoryProvider)
    .useClass(InMemoryRepositoryProvider)
    .compile();

  const app = moduleRef.createNestApplication();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: false },
      forbidNonWhitelisted: true,
      whitelist: true,
      exceptionFactory: (
        validationErrors: ValidationError[] = [],
      ): BadRequestException => {
        return new BadRequestException(
          validationErrors.map((error) => ({
            field: error.property,
            error: Object.values(error.constraints).join(', '),
          })),
        );
      },
    }),
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapter));

  return app;
}
