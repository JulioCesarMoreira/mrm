import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ModelProposalRepository } from '@application/core/repositories';
import { ModelProposal } from '@application/core/entities';

@Injectable()
export class PrismaModelProposalRepository implements ModelProposalRepository {
  prisma = new PrismaClient();

  async create(
    modelProposal: Omit<ModelProposal, 'id'>,
  ): Promise<ModelProposal> {
    const createdModelProposal = await this.prisma.modelProposal.create({
      data: {
        name: modelProposal.name,

        tenantId: modelProposal.tenantId,
      },
    });

    return createdModelProposal;
  }

  async get(id: number): Promise<ModelProposal> {
    const getModelProposal = await this.prisma.modelProposal.findUnique({
      where: {
        id: id,
      },
    });

    return getModelProposal;
  }

  async fetch({
    name,
    tenantId,
  }: Omit<ModelProposal, 'id'>): Promise<ModelProposal[]> {
    const fetchModelProposal = await this.prisma.modelProposal.findMany({
      where: {
        ...(name && { name: { contains: name } }),
        ...(tenantId && { tenantId }),
      },
    });

    return fetchModelProposal;
  }

  async update(
    entityId: number,
    { name }: Omit<ModelProposal, 'id' | 'proposalId'>,
  ): Promise<ModelProposal> {
    const updatedModelProposal = await this.prisma.modelProposal.update({
      where: {
        id: entityId,
      },
      data: {
        ...(name && { name }),
      },
    });

    return updatedModelProposal;
  }

  async delete(id: number): Promise<boolean> {
    const modelProposal = await this.prisma.modelProposal.delete({
      where: {
        id,
      },
    });

    return !!modelProposal || false;
  }
}
