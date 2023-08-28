import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ItemProposalServiceRepository } from '@application/core/repositories';
import { ItemProposalService } from '@application/core/entities';

@Injectable()
export class PrismaItemProposalServiceRepository
  implements ItemProposalServiceRepository
{
  prisma = new PrismaClient();

  async create(
    itemProposalService: Omit<ItemProposalService, 'id'>,
  ): Promise<ItemProposalService> {
    const createdItemProposalService =
      await this.prisma.itemProposalService.create({
        data: {
          unitPrice: itemProposalService.unitPrice,
          quantity: itemProposalService.quantity,
          proposalServiceId: itemProposalService.proposalServiceId,
          itemServiceId: itemProposalService.itemServiceId,
        },
      });

    return createdItemProposalService;
  }

  async get(id: number): Promise<ItemProposalService> {
    const getItemProposalService =
      await this.prisma.itemProposalService.findUnique({
        where: {
          id: id,
        },
      });

    return getItemProposalService;
  }

  async fetch({
    unitPrice,
    quantity,
    proposalServiceId,
    itemServiceId,
  }: Omit<ItemProposalService, 'id'>): Promise<ItemProposalService[]> {
    const fetchItemProposalService =
      await this.prisma.itemProposalService.findMany({
        where: {
          ...(unitPrice && { unitPrice }),
          ...(quantity && { quantity }),
          ...(proposalServiceId && { proposalServiceId }),
          ...(itemServiceId && { itemServiceId }),
        },
      });

    return fetchItemProposalService;
  }

  async update(
    entityId: number,
    {
      unitPrice,
      quantity,
      itemServiceId,
    }: Omit<ItemProposalService, 'id' | 'proposalServiceId'>,
  ): Promise<ItemProposalService> {
    const updatedItemProposalService =
      await this.prisma.itemProposalService.update({
        where: {
          id: entityId,
        },
        data: {
          ...(unitPrice && { unitPrice }),
          ...(quantity && { quantity }),
          ...(itemServiceId && { itemServiceId }),
        },
      });

    return updatedItemProposalService;
  }

  async delete(id: number): Promise<boolean> {
    const itemProposalService = await this.prisma.itemProposalService.delete({
      where: {
        id,
      },
    });

    return !!itemProposalService || false;
  }
}
