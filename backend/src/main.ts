import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './infra/global-exception/global-exception.filter';
import { ValidationError } from 'class-validator';
import { AuthGuard } from './infra/guard/auth.guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

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

  const jwtService = app.get(JwtService);
  app.useGlobalGuards(new AuthGuard(jwtService));

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://mrmsoftware.cloud',
      'http://mrmsoftware.cloud.s3-website-us-west-2.amazonaws.com',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(8000, '0.0.0.0');
}

bootstrap();
