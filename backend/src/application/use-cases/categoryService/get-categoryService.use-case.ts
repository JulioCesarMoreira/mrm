import { CategoryService } from '@application/core/entities';
import { CategoryServiceRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetCategoryServiceUseCase {
  constructor(private categoryServiceeRepository: CategoryServiceRepository) {}

  async getCategoryService(id: number): Promise<CategoryService> {
    const getCategoryService = await this.categoryServiceeRepository.get(id);

    return getCategoryService;
  }
}
