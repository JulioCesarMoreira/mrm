import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ModelProposalItemServiceRepository } from '@application/core/repositories';
import { ModelProposalItemService } from '@application/core/entities';

@Injectable()
export class PrismaModelProposalItemServiceRepository
  implements ModelProposalItemServiceRepository
{
  prisma = new PrismaClient();

  async create(
    modelProposalItemService: Omit<ModelProposalItemService, 'id'>,
  ): Promise<ModelProposalItemService> {
    const createdModelProposalItemService =
      await this.prisma.modelProposalItemService.create({
        data: {
          modelProposalId: modelProposalItemService.modelProposalId,
          itemServiceId: modelProposalItemService.itemServiceId,
        },
      });

    return createdModelProposalItemService;
  }

  async get(id: number): Promise<ModelProposalItemService> {
    const getModelProposalItemService =
      await this.prisma.modelProposalItemService.findUnique({
        where: {
          id: id,
        },
      });

    return getModelProposalItemService;
  }

  async fetch({
    modelProposalId,
    itemServiceId,
  }: Omit<ModelProposalItemService, 'id'>): Promise<
    ModelProposalItemService[]
  > {
    const fetchModelProposalItemService =
      await this.prisma.modelProposalItemService.findMany({
        where: {
          ...(modelProposalId && { modelProposalId }),
          ...(itemServiceId && { itemServiceId }),
        },
      });

    return fetchModelProposalItemService;
  }

  async delete(id: number): Promise<boolean> {
    const modelProposalItemService =
      await this.prisma.modelProposalItemService.delete({
        where: {
          id,
        },
      });

    return !!modelProposalItemService || false;
  }
}
