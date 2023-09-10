import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ProposalRepository } from '@application/core/repositories';
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

  async get(id: number): Promise<Proposal> {
    const getProposal = await this.prisma.proposal.findUnique({
      where: {
        id: id,
      },
    });

    return getProposal;
  }

  async fetch({
    sendDate,
    installmentsBalance,
    periodValidity,
    discount,
    percentageEntry,
    guaranteePeriod,
    approved,
    clientId,
    tenantId,
  }: Omit<Proposal, 'id'>): Promise<Proposal[]> {
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
  ): Promise<Proposal> {
    const updatedProposal = await this.prisma.proposal.update({
      where: {
        id: entityId,
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

  async delete(id: number): Promise<boolean> {
    const proposal = await this.prisma.proposal.delete({
      where: {
        id,
      },
    });

    return !!proposal || false;
  }
}
