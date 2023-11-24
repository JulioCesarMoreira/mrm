import { CategoryService } from '@application/core/entities';

export abstract class CategoryServiceRepository {
  abstract create(
    entity: Omit<CategoryService, 'id'>,
  ): Promise<CategoryService>;

  abstract get(id: number): Promise<CategoryService | null>;

  abstract fetch(
    filters: Omit<CategoryService, 'id'>,
    tenantId: string,
  ): Promise<CategoryService[]>;

  abstract update(
    entityId: number,
    entityFields: Omit<CategoryService, 'id' | 'tenantId'>,
    tenantId: string,
  ): Promise<CategoryService>;

  abstract delete(id: number, tenantId: string): Promise<boolean>;
}
