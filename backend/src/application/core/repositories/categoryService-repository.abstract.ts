import {
  FetchCategoryServicesDto,
  UpdateCategoryServiceDto,
} from '../dtos/categoryService';
import { CategoryService } from '../entities/categoryService.entity';

export abstract class ICategoryServiceRepository {
  abstract create(entity: CategoryService): Promise<CategoryService>;

  abstract get(id: number): Promise<CategoryService | null>;

  abstract fetch(filters: FetchCategoryServicesDto): Promise<CategoryService[]>;

  abstract update(
    entityId: number,
    entityFields: UpdateCategoryServiceDto,
  ): Promise<CategoryService>;

  abstract delete(id: number): Promise<boolean>;
}
