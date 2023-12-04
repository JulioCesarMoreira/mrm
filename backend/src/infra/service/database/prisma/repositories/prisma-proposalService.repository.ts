import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ProposalServiceRepository } from '@application/core/repositories/database';
import { ProposalService } from '@application/core/entities';

@Injectable()
export class PrismaProposalServiceRepository
  implements ProposalServiceRepository
{
  prisma = new PrismaClient();

  async create(
    proposalService: Omit<ProposalService, 'id'>,
  ): Promise<ProposalService> {
    const createdProposalService = await this.prisma.proposalService.create({
      data: {
        order: proposalService.order,
        side: proposalService.side,
        proposalId: proposalService.proposalId,
        categoryServiceId: proposalService.categoryServiceId,
      },
    });

    return createdProposalService;
  }

  async get(id: number): Promise<ProposalService> {
    const getProposalService = await this.prisma.proposalService.findUnique({
      where: {
        id: Number(id),
      },
    });

    return getProposalService;
  }

  async fetch({
    order,
    side,
    proposalId,
  }: Omit<ProposalService, 'id' | 'categoryServiceId'>): Promise<
    ProposalService[]
  > {
    const fetchProposalService = await this.prisma.proposalService.findMany({
      where: {
        ...(order && { order }),
        ...(side && { side }),
        ...(proposalId && { proposalId }),
      },
    });

    return fetchProposalService;
  }

  async update(
    entityId: number,
    {
      order,
      side,
    }: Omit<ProposalService, 'id' | 'proposalId' | 'categoryServiceId'>,
  ): Promise<ProposalService> {
    const updatedProposalService = await this.prisma.proposalService.update({
      where: {
        id: entityId,
      },
      data: {
        ...(order && { order }),
        ...(side && { side }),
      },
    });

    return updatedProposalService;
  }

  async delete(id: number): Promise<boolean> {
    const proposalService = await this.prisma.proposalService.delete({
      where: {
        id,
      },
    });

    return !!proposalService || false;
  }
}
