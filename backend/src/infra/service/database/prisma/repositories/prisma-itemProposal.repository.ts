import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ItemProposalRepository } from '@application/core/repositories';
import { ItemProposal } from '@application/core/entities';

@Injectable()
export class PrismaItemProposalRepository implements ItemProposalRepository {
  prisma = new PrismaClient();

  async create(itemProposal: Omit<ItemProposal, 'id'>): Promise<ItemProposal> {
    const createdItemProposal = await this.prisma.itemProposal.create({
      data: {
        unitPrice: itemProposal.unitPrice,
        quantity: itemProposal.quantity,
        proposalServiceId: itemProposal.proposalServiceId,
        itemServiceId: itemProposal.itemServiceId,
      },
    });

    return createdItemProposal;
  }

  async get(id: number): Promise<ItemProposal> {
    const getItemProposal = await this.prisma.itemProposal.findUnique({
      where: {
        id: id,
      },
    });

    return getItemProposal;
  }

  async fetch({
    unitPrice,
    quantity,
    proposalServiceId,
    itemServiceId,
  }: Omit<ItemProposal, 'id'>): Promise<ItemProposal[]> {
    const fetchItemProposal = await this.prisma.itemProposal.findMany({
      where: {
        ...(unitPrice && { unitPrice }),
        ...(quantity && { quantity }),
        ...(proposalServiceId && { proposalServiceId }),
        ...(itemServiceId && { itemServiceId }),
      },
    });

    return fetchItemProposal;
  }

  async update(
    entityId: number,
    {
      unitPrice,
      quantity,
      itemServiceId,
    }: Omit<ItemProposal, 'id' | 'proposalServiceId'>,
  ): Promise<ItemProposal> {
    const updatedItemProposal = await this.prisma.itemProposal.update({
      where: {
        id: entityId,
      },
      data: {
        ...(unitPrice && { unitPrice }),
        ...(quantity && { quantity }),
        ...(itemServiceId && { itemServiceId }),
      },
    });

    return updatedItemProposal;
  }

  async delete(id: number): Promise<boolean> {
    const itemProposal = await this.prisma.itemProposal.delete({
      where: {
        id,
      },
    });

    return !!itemProposal || false;
  }
}
