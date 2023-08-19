import { Injectable } from '@nestjs/common';
import { ICategoryServiceRepository } from '@application/core/repositories';
import { CategoryService } from '@application/core/entities';
import { CreateCategoryServiceDto } from '@application/core/dtos/categoryService.dto';

@Injectable()
export class CreateCategoryServiceUseCase {
  constructor(private categoryServiceRepository: ICategoryServiceRepository) {}

  async createCategoryService(
    categoryService: CreateCategoryServiceDto,
  ): Promise<CategoryService> {
    const createdCategoryService = await this.categoryServiceRepository.create(
      categoryService,
    );

    return createdCategoryService;
  }
}
