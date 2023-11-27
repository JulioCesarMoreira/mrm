import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ProposalRepository } from '@application/core/repositories/database';
import { Proposal } from '@application/core/entities';

@Injectable()
export class PrismaProposalRepository implements ProposalRepository {
  prisma = new PrismaClient();

  async create(proposal: Omit<Proposal, 'id'>): Promise<Proposal> {
    const createdProposal = await this.prisma.proposal.create({
      data: {
        sendDate: proposal.sendDate,

        installmentsBalance: proposal.installmentsBalance,

        periodValidity: proposal.periodValidity,

        discount: proposal.discount,

        percentageEntry: proposal.percentageEntry,

        guaranteePeriod: proposal.guaranteePeriod,

        approved: proposal.approved,

        clientId: proposal.clientId,

        tenantId: proposal.tenantId,
      },
    });

    return createdProposal;
  }

  async get(proposalId: number, tenantId: string): Promise<Proposal> {
    const getProposal = await this.prisma.proposal.findUnique({
      where: { id: proposalId },
    });

    if (getProposal.tenantId !== tenantId) return null;

    return getProposal;
  }

  async fetch(
    {
      sendDate,
      installmentsBalance,
      periodValidity,
      discount,
      percentageEntry,
      guaranteePeriod,
      approved,
      clientId,
    }: Omit<Proposal, 'id'>,
    tenantId: string,
  ): Promise<Proposal[]> {
    const fetchProposal = await this.prisma.proposal.findMany({
      where: {
        ...(sendDate && { sendDate }),
        ...(installmentsBalance && { installmentsBalance }),
        ...(periodValidity && { periodValidity }),
        ...(discount && { discount }),
        ...(percentageEntry && { percentageEntry }),
        ...(guaranteePeriod && { guaranteePeriod }),
        ...(approved && { approved }),
        ...(clientId && { clientId }),
        ...(tenantId && { tenantId }),
      },
    });

    return fetchProposal;
  }

  async update(
    entityId: number,
    {
      sendDate,
      installmentsBalance,
      periodValidity,
      discount,
      percentageEntry,
      guaranteePeriod,
      approved,
    }: Omit<Proposal, 'id' | 'tenantId' | 'clientId'>,
    tenantId: string,
  ): Promise<Proposal> {
    const updatedProposal = await this.prisma.proposal.update({
      where: {
        id: entityId,
        tenantId,
      },
      data: {
        ...(sendDate && { sendDate }),
        ...(installmentsBalance && { installmentsBalance }),
        ...(periodValidity && { periodValidity }),
        ...(discount && { discount }),
        ...(percentageEntry && { percentageEntry }),
        ...(guaranteePeriod && { guaranteePeriod }),
        ...(approved && { approved }),
      },
    });

    return updatedProposal;
  }

  async delete(id: number, tenantId: string): Promise<boolean> {
    const proposal = await this.prisma.proposal.delete({
      where: {
        id,
        tenantId,
      },
    });

    return !!proposal || false;
  }
}
