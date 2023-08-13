import * as request from 'supertest';
import { bootstrap } from '__tests__/utils/bootstrap';
import { INestApplication } from '@nestjs/common';

describe('Client routes e2e testing', () => {
  let app: INestApplication;
  const path = '/client';

  beforeAll(async () => {
    app = await bootstrap();
    app.init();
  });

  it.skip('should not create client without a invalid CNPJ', async () => {
    const payload = {
      contactName: 'Cliente test',
      contactPhone: '42999999999',
      cpfCnpj: '00000000005',
      name: 'Nome test',
      tenantId: '3d222283-d485-4b54-acb8-5f290c105143',
    };

    const response = await request(app.getHttpServer())
      .post(path)
      .send(payload);

    expect(response.body.sucess).toBeTruthy();

    const expectedClient = { ...payload };

    const createdClient = { ...response.body.createdClient };
    delete createdClient.id;

    expect(createdClient).toEqual(expectedClient);
  });

  it('should create client without a valid CNPJ', async () => {
    const payload = {
      contactName: 'Cliente test',
      contactPhone: '42999999999',
      cpfCnpj: '58677087000116',
      name: 'Nome test',
      tenantId: '3d222283-d485-4b54-acb8-5f290c105143',
    };

    const response = await request(app.getHttpServer())
      .post(path)
      .send(payload);

    expect(response.body.sucess).toBeTruthy();

    const expectedClient = { ...payload };

    const createdClient = { ...response.body.createdClient };
    delete createdClient.id;

    expect(createdClient).toEqual(expectedClient);
  });

  it.skip('should not create client without a invalid CPF', async () => {
    const payload = {
      contactName: 'Cliente test',
      contactPhone: '42999999999',
      cpfCnpj: '00000000000',
      name: 'nome test',
      tenantId: '3d222283-d485-4b54-acb8-5f290c105143',
    };

    const response = await request(app.getHttpServer())
      .post(path)
      .send(payload);

    expect(response.body.sucess).toBeTruthy();

    const expectedClient = { ...payload };

    const createdClient = { ...response.body.createdClient };
    delete createdClient.id;

    expect(createdClient).toEqual(expectedClient);
  });

  it('should create client without a valid CPF', async () => {
    const payload = {
      contactName: 'Cliente test',
      contactPhone: '42999999999',
      cpfCnpj: '57767455009',
      name: 'Nome test',
      tenantId: '3d222283-d485-4b54-acb8-5f290c105143',
    };

    const response = await request(app.getHttpServer())
      .post(path)
      .send(payload);

    expect(response.body.sucess).toBeTruthy();

    const expectedClient = { ...payload };

    const createdClient = { ...response.body.createdClient };
    delete createdClient.id;

    expect(createdClient).toEqual(expectedClient);
  });

  it.only('should not create client without a invalid tenantId', async () => {
    const payload = {
      contactName: 'Cliente test',
      contactPhone: '42999999999',
      cpfCnpj: '57767455009',
      name: 'Nome test',
      tenantId: '7d9fa6ac-2714-4468-8c82-a13e578bc3fd',
    };

    const response = await request(app.getHttpServer())
      .post(path)
      .send(payload);

    console.log('response', response.statusCode);
  });

  it('should return bad request when try create a client with types of payload are wrong', async () => {
    const payload = {
      contactName: 1,
      contactPhone: 2,
      cpfCnpj: 3,
      name: 4,
      tenantId: '7d9fa6ac-2714-4468-8c82-a13e578bc3fd',
    };

    const response = await request(app.getHttpServer())
      .post(path)
      .send(payload);

    expect(response.body.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  afterAll(async () => {
    app.close();
  });
});
