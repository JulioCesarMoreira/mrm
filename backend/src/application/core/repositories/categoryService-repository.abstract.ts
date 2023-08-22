import { CategoryService } from '@application/core/entities';

export abstract class ICategoryServiceRepository {
  abstract create(
    entity: Omit<CategoryService, 'id'>,
  ): Promise<CategoryService>;

  abstract get(id: number): Promise<CategoryService | null>;

  abstract fetch(
    filters: Omit<CategoryService, 'id'>,
  ): Promise<CategoryService[]>;

  abstract update(
    entityId: number,
    entityFields: Omit<CategoryService, 'id' | 'tenantId'>,
  ): Promise<CategoryService>;

  abstract delete(id: number): Promise<boolean>;
}
