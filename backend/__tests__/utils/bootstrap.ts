import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Test } from '@nestjs/testing';
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
  app.useGlobalPipes(new ValidationPipe());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapter));

  return app;
}
