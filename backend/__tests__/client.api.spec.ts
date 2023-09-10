import { ClientRepository } from '@application/core/repositories';
import { InMemoryClientRepository } from '@infra/service/database/inMemory/repositories/inMemory-client.repository';
import { bootstrap } from '__tests__/utils/bootstrap';
import { INestApplication } from '@nestjs/common';
import generateFakeCpf from './utils/cpfFaker';
import * as request from 'supertest';

// Container de testes
describe('Client routes e2e testing', () => {
  let app: INestApplication;
  const path = '/client';
  let clientId: number;

  // Inicialização da API
  beforeAll(async () => {
    app = await bootstrap(ClientRepository, InMemoryClientRepository);
    app.init();
  });

  // Objeto válido que será aceito pela API
  const payload = {
    name: 'Nome test',
    cpfCnpj: generateFakeCpf(),
    contactName: 'Cliente teste 1',
    contactPhone: '42999999999',
    tenantId: '3d222283-d485-4b54-acb8-5f290c105143',
  };

  // Caso de teste a ser executado
  it('should not CREATE client with a invalid CNPJ or CPF', async () => {
    const cnpjFailPlayload = {
      name: 'Nome test',
      cpfCnpj: '00000000000000', // 000.000.000/0000-00
      contactName: 'Cliente teste 1',
      contactPhone: '42999999999', // 00 0 0000-0000
      tenantId: '3d222283-d485-4b54-acb8-5f290c105143', // uuid
    };

    const cnpjResponse = await request(app.getHttpServer())
      .post(path)
      .send(cnpjFailPlayload);

    const expectedError = [{ field: 'cpfCnpj', error: 'Invalid cpf or cnpj' }];

    const receivedError = cnpjResponse.body.message;

    expect(cnpjResponse.statusCode).toBe(400);
    expect(receivedError).toEqual(expectedError);
  });

  it.only('should not CREATE client with out the name of company', async () => {
    const cnpjFailPlayload = {
      cpfCnpj: generateFakeCpf(), // 000.000.000/0000-00
      contactName: 'Cliente teste 1',
      contactPhone: '42999999999', // 00 0 0000-0000
      tenantId: '3d222283-d485-4b54-acb8-5f290c105143', // uuid
    };

    const cnpjResponse = await request(app.getHttpServer())
      .post(path)
      .send(cnpjFailPlayload);

    const expectedError = [
      {
        field: 'name',
        error:
          'name must be shorter than or equal to 191 characters, name must be a string',
      },
    ];

    const receivedError = cnpjResponse.body.message;

    expect(cnpjResponse.statusCode).toBe(400);
    expect(receivedError).toEqual(expectedError);
  });

  it('should CREATE client with a valid CNPJ', async () => {
    const response = await request(app.getHttpServer())
      .post(path)
      .send(payload);

    const expectedClient = { ...payload };

    const createdClient = { ...response.body };

    clientId = createdClient.id;

    delete createdClient.id;

    expect(response.statusCode).toBe(201);
    expect(createdClient).toEqual(expectedClient);
  });

  it('should GET client with a valid id', async () => {
    const response = await request(app.getHttpServer()).get(
      `${path}/${clientId.toString()}`,
    );

    const expectedClient = { ...payload };

    const getClient = { ...response.body };

    clientId = getClient.id;

    delete getClient.id;

    expect(response.statusCode).toBe(200);
    expect(getClient).toEqual(expectedClient);
  });

  it('should FETCH client with a valid playload', async () => {
    const fetchPayload = {
      contactName: 'Cliente test',
    };
    const response = await request(app.getHttpServer())
      .get(path)
      .send(fetchPayload);

    const expectedClient = {
      ...payload,
      id: clientId,
    };

    const getClient = { ...response.body };

    const clientInList = getClient.clients.find(
      (client: {
        id: number;
        contactName: string;
        contactPhone: string;
        cpfCnpj: string;
        name: string;
        tenantId: string;
      }) => client.id == clientId,
    );

    expect(response.statusCode).toBe(200);
    expect(clientInList).not.toBeUndefined();
    expect(clientInList).toStrictEqual(expectedClient);
  });

  it('should UPDATE client with a valid payload', async () => {
    const updatePayload = {
      contactName: 'Cliente test 2',
      contactPhone: '42999999998',
      cpfCnpj: '58677087000116',
      name: 'Nome test 2',
    };

    const response = await request(app.getHttpServer())
      .patch(`${path}/${clientId.toString()}`)
      .send(updatePayload);

    const expectedClient = {
      ...updatePayload,
      tenantId: payload.tenantId,
      id: clientId,
    };

    const updatedClient = { ...response.body };

    expect(response.statusCode).toBe(200);
    expect(updatedClient).toEqual(expectedClient);
  });

  it('should DELETE client with a valid id', async () => {
    const response = await request(app.getHttpServer()).delete(
      `${path}/${clientId.toString()}`,
    );

    const deltedClientResponse = { ...response.body };

    expect(response.statusCode).toBe(200);
    expect(deltedClientResponse.sucess).toBeTruthy();

    const checkResponse = await request(app.getHttpServer()).get(
      `${path}/${clientId.toString()}`,
    );

    const getClient = { ...checkResponse.body };

    expect(checkResponse.statusCode).toBe(200);
    expect(getClient).toStrictEqual({});
  });

  afterAll(async () => {
    app.close();
  });
});
