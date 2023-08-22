import * as request from 'supertest';
import { bootstrap } from '__tests__/utils/bootstrap';
import { INestApplication } from '@nestjs/common';

describe('CategoryService routes e2e testing', () => {
  let app: INestApplication;
  const path = '/categoryService';
  let categoryServiceId: number;

  beforeAll(async () => {
    app = await bootstrap();
    app.init();
  });

  const payload = {
    name: 'Caregoria Nome test 1',
    subCategory: 'SERVICE',
    tenantId: '3d222283-d485-4b54-acb8-5f290c105143',
  };

  it('should CREATE categoryService with a valid payload', async () => {
    const response = await request(app.getHttpServer())
      .post(path)
      .send(payload);

    const expectedCategoryService = { ...payload };

    const createdCategoryService = { ...response.body };

    categoryServiceId = createdCategoryService.id;

    delete createdCategoryService.id;

    expect(response.statusCode).toBe(201);
    expect(createdCategoryService).toEqual(expectedCategoryService);
  });

  it('should GET categoryService with a valid id', async () => {
    const response = await request(app.getHttpServer()).get(
      `${path}/${categoryServiceId.toString()}`,
    );

    const expectedCategoryService = { ...payload };

    const getCategoryService = { ...response.body };

    categoryServiceId = getCategoryService.id;

    delete getCategoryService.id;

    expect(response.statusCode).toBe(200);
    expect(getCategoryService).toEqual(expectedCategoryService);
  });

  it('should FETCH categoryService with a valid playload', async () => {
    const fetchPayload = {
      contactName: 'goria',
    };

    const response = await request(app.getHttpServer())
      .get(path)
      .send(fetchPayload);

    const expectedCategoryService = {
      ...payload,
      id: categoryServiceId,
    };

    const getCategoryService = { ...response.body };

    const categoryServiceInList = getCategoryService.categoryServices.find(
      (categoryService: {
        id: number;
        subCategory: string;
        name: string;
        tenantId: string;
      }) => categoryService.id == categoryServiceId,
    );

    expect(response.statusCode).toBe(200);
    expect(categoryServiceInList).not.toBeUndefined();
    expect(categoryServiceInList).toStrictEqual(expectedCategoryService);
  });

  it('should UPDATE categoryService with a valid payload', async () => {
    const updatePayload = {
      name: 'nome test 2',
      subCategory: 'SUPLIE',
    };

    const response = await request(app.getHttpServer())
      .patch(`${path}/${categoryServiceId.toString()}`)
      .send(updatePayload);

    const expectedCategoryService = {
      ...updatePayload,
      tenantId: payload.tenantId,
      id: categoryServiceId,
    };

    const updatedCategoryService = { ...response.body };

    expect(response.statusCode).toBe(200);
    expect(updatedCategoryService).toEqual(expectedCategoryService);
  });

  it('should DELETE categoryService with a valid id', async () => {
    const response = await request(app.getHttpServer()).delete(
      `${path}/${categoryServiceId.toString()}`,
    );

    const deltedCategoryServiceResponse = { ...response.body };

    expect(response.statusCode).toBe(200);
    expect(deltedCategoryServiceResponse.sucess).toBeTruthy();

    const checkResponse = await request(app.getHttpServer()).get(
      `${path}/${categoryServiceId.toString()}`,
    );

    const getCategoryService = { ...checkResponse.body };

    expect(checkResponse.statusCode).toBe(200);
    expect(getCategoryService).toStrictEqual({});
  });

  afterAll(async () => {
    app.close();
  });
});
