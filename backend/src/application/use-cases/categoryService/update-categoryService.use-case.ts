import { CategoryService } from '@application/core/entities';
import { ICategoryServiceRepository } from '@application/core/repositories';
import { UpdateCategoryServiceDto } from '@infra/http/dtos/categoryService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateCategoryServiceUseCase {
  constructor(private categoryServiceRepository: ICategoryServiceRepository) {}

  async updateCategoryService(
    categoryServiceId: number,
    categoryServiceFields: UpdateCategoryServiceDto,
  ): Promise<CategoryService> {
    const updatedCategoryService = await this.categoryServiceRepository.update(
      categoryServiceId,
      categoryServiceFields,
    );
    return updatedCategoryService;
  }
}
