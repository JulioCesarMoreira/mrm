import { ModelItemCategory } from '@application/core/entities';

export abstract class ModelItemCategoryRepository {
  abstract create(
    entity: Omit<ModelItemCategory, 'id'>,
  ): Promise<ModelItemCategory>;

  abstract get(id: number): Promise<ModelItemCategory | null>;

  abstract fetch(
    filters: Omit<ModelItemCategory, 'id'>,
  ): Promise<ModelItemCategory[]>;

  abstract delete(id: number): Promise<boolean>;
}
