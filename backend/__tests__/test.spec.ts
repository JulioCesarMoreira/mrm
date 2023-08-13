import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('GOaaaa', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  it('fuck you', async () => {
    const response = await request(app.getHttpServer()).get('/client/3');

    console.log('response', response.body);
  });

  afterAll(async () => {
    await app.close();
  });
});
