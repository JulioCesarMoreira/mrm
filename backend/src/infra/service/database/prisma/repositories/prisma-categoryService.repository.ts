import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CategoryServiceRepository } from '@application/core/repositories/database';
import { CategoryService } from '@application/core/entities';

@Injectable()
export class PrismaCategoryServiceRepository
  implements CategoryServiceRepository
{
  prisma = new PrismaClient();

  async create(
    categoryService: Omit<CategoryService, 'id'>,
  ): Promise<CategoryService> {
    const createdCategoryService = await this.prisma.categoryService.create({
      data: {
        name: categoryService.name,

        subCategory: categoryService.subCategory,

        color: categoryService.color,

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

  async fetch(
    { name, subCategory, color }: Omit<CategoryService, 'id' | 'tenantId'>,
    tenantId: string,
  ): Promise<CategoryService[]> {
    const fetchCategoryService = await this.prisma.categoryService.findMany({
      where: {
        ...(name && { name: { contains: name } }),
        ...(subCategory && { subCategory }),
        ...(color && { color }),
        ...(tenantId && { tenantId }),
      },
    });

    return fetchCategoryService;
  }

  async update(
    entityId: number,
    { subCategory, name, color }: Omit<CategoryService, 'id' | 'tenantId'>,
    tenantId: string,
  ): Promise<CategoryService> {
    const verifyTenant = await this.prisma.categoryService.count({
      where: {
        id: entityId,
        tenantId,
      },
    });

    if (verifyTenant === 0) return undefined;

    const updatedCategoryService = await this.prisma.categoryService.update({
      where: {
        id: entityId,
      },
      data: {
        ...(subCategory && { subCategory }),
        ...(name && { name }),
        ...(color && { color }),
      },
    });

    return updatedCategoryService;
  }

  async delete(id: number, tenantId: string): Promise<boolean> {
    const verifyTenant = await this.prisma.categoryService.count({
      where: {
        id,
        tenantId,
      },
    });

    if (verifyTenant === 0) return false;

    const categoryService = await this.prisma.categoryService.delete({
      where: {
        id,
      },
    });

    return !!categoryService || false;
  }
}
