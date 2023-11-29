import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ModelProposalRepository } from '@application/core/repositories/database';
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

  async get(id: number, tenantId: string): Promise<ModelProposal> {
    const getModelProposal = await this.prisma.modelProposal.findUnique({
      where: {
        id: id,
      },
    });

    if (getModelProposal && getModelProposal.tenantId !== tenantId) return null;

    return getModelProposal;
  }

  async fetch(
    { name }: Omit<ModelProposal, 'id'>,
    tenantId: string,
  ): Promise<ModelProposal[]> {
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
    tenantId: string,
  ): Promise<ModelProposal> {
    const valitadeTenant = await this.prisma.modelProposal.count({
      where: {
        id: entityId,
        tenantId,
      },
    });

    if (valitadeTenant === 0) return undefined;

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

  async delete(id: number, tenantId: string): Promise<boolean> {
    const valitadeTenant = await this.prisma.modelProposal.count({
      where: {
        id,
        tenantId,
      },
    });

    if (valitadeTenant === 0) return false;

    const modelProposal = await this.prisma.modelProposal.delete({
      where: {
        id,
      },
    });

    return !!modelProposal || false;
  }
}
