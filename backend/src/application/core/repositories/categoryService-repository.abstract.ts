import {
  CreateCategoryServiceDto,
  FetchCategoryServicesDto,
  UpdateCategoryServiceDto,
} from '@application/core/dtos/categoryService.dto';
import { CategoryService } from '@application/core/entities';

export abstract class ICategoryServiceRepository {
  abstract create(entity: CreateCategoryServiceDto): Promise<CategoryService>;

  abstract get(id: number): Promise<CategoryService | null>;

  abstract fetch(filters: FetchCategoryServicesDto): Promise<CategoryService[]>;

  abstract update(
    entityId: number,
    entityFields: UpdateCategoryServiceDto,
  ): Promise<CategoryService>;

  abstract delete(id: number): Promise<boolean>;
}
