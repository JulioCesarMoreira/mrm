import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ICategoryServiceRepository } from '@application/core/repositories';
import { CategoryService } from '@application/core/entities';
import {
  FetchCategoryServicesDto,
  UpdateCategoryServiceDto,
} from '@infra/http/dtos/categoryService';
import { CreateCategoryServiceDto } from '@application/core/dtos/categoryService.dto';

@Injectable()
export class PrismaCategoryServiceRepository
  implements ICategoryServiceRepository
{
  prisma = new PrismaClient();

  async create(
    categoryService: CreateCategoryServiceDto,
  ): Promise<CategoryService> {
    const createdCategoryService = await this.prisma.categoryService.create({
      data: {
        name: categoryService.name,

        subCategory: categoryService.subCategory,

        tenantId: categoryService.tenantId,
      },
    });

    return createdCategoryService;
  }

  async get(id: number): Promise<CategoryService> {
    const getCategoryService = await this.prisma.categoryService.findUnique({
      where: {
        id: id,
      },
    });

    return getCategoryService;
  }

  async fetch({
    id,
    name,
    subCategory,
    tenantId,
  }: FetchCategoryServicesDto): Promise<CategoryService[]> {
    const fetchCategoryService = await this.prisma.categoryService.findMany({
      where: {
        ...(id && { id }),
        ...(subCategory && { subCategory }),
        ...(name && { name: { contains: name } }),
        ...(tenantId && { tenantId }),
      },
    });

    return fetchCategoryService;
  }

  async update(
    entityId: number,
    { subCategory, name }: UpdateCategoryServiceDto,
  ): Promise<CategoryService> {
    const updatedCategoryService = await this.prisma.categoryService.update({
      where: {
        id: entityId,
      },
      data: {
        ...(subCategory && { subCategory }),
        ...(name && { name }),
      },
    });

    return updatedCategoryService;
  }

  async delete(id: number): Promise<boolean> {
    const categoryService = await this.prisma.categoryService.delete({
      where: {
        id,
      },
    });

    return !!categoryService || false;
  }
}
