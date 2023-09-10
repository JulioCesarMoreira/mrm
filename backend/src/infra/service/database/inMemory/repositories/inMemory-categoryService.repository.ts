import { CategoryService } from '@application/core/entities';
import { CategoryServiceRepository } from '@application/core/repositories';

export class InMemoryCategoryServiceRepository extends CategoryServiceRepository {
  private categoryServices: CategoryService[] = [];
  private nextId = 1;

  async create(entity: Omit<CategoryService, 'id'>): Promise<CategoryService> {
    const newCategoryService: CategoryService = {
      ...entity,
      id: this.nextId++,
    };
    this.categoryServices.push(newCategoryService);
    return newCategoryService;
  }

  async get(id: number): Promise<CategoryService | null> {
    const categoryService = this.categoryServices.find((cs) => cs.id === id);
    return categoryService || null;
  }

  async fetch(
    filters: Omit<CategoryService, 'id'>,
  ): Promise<CategoryService[]> {
    return this.categoryServices.filter((cs) =>
      Object.keys(filters).every((key) => filters[key] === cs[key]),
    );
  }

  async update(
    entityId: number,
    entityFields: Omit<CategoryService, 'id' | 'tenantId'>,
  ): Promise<CategoryService> {
    const categoryServiceIndex = this.categoryServices.findIndex(
      (cs) => cs.id === entityId,
    );
    if (categoryServiceIndex === -1) {
      throw new Error(`CategoryService with ID ${entityId} not found`);
    }
    const updatedCategoryService = {
      ...this.categoryServices[categoryServiceIndex],
      ...entityFields,
    };
    this.categoryServices[categoryServiceIndex] = updatedCategoryService;
    return updatedCategoryService;
  }

  async delete(id: number): Promise<boolean> {
    const initialLength = this.categoryServices.length;
    this.categoryServices = this.categoryServices.filter((cs) => cs.id !== id);
    return this.categoryServices.length < initialLength;
  }
}
