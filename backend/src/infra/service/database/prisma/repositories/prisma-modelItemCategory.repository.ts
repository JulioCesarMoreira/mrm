import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ModelItemCategoryRepository } from '@application/core/repositories';
import { ModelItemCategory } from '@application/core/entities';

@Injectable()
export class PrismaModelItemCategoryRepository
  implements ModelItemCategoryRepository
{
  prisma = new PrismaClient();

  async create(
    modelItemCategory: Omit<ModelItemCategory, 'id'>,
  ): Promise<ModelItemCategory> {
    const createdModelItemCategory = await this.prisma.modelItemCategory.create(
      {
        data: {
          modelProposalId: modelItemCategory.modelProposalId,
          itemServiceId: modelItemCategory.itemServiceId,
        },
      },
    );

    return createdModelItemCategory;
  }

  async get(id: number): Promise<ModelItemCategory> {
    const getModelItemCategory = await this.prisma.modelItemCategory.findUnique(
      {
        where: {
          id: id,
        },
      },
    );

    return getModelItemCategory;
  }

  async fetch({
    modelProposalId,
    itemServiceId,
  }: Omit<ModelItemCategory, 'id'>): Promise<ModelItemCategory[]> {
    const fetchModelItemCategory = await this.prisma.modelItemCategory.findMany(
      {
        where: {
          ...(modelProposalId && { modelProposalId }),
          ...(itemServiceId && { itemServiceId }),
        },
      },
    );

    return fetchModelItemCategory;
  }

  async delete(id: number): Promise<boolean> {
    const modelItemCategory = await this.prisma.modelItemCategory.delete({
      where: {
        id,
      },
    });

    return !!modelItemCategory || false;
  }
}
