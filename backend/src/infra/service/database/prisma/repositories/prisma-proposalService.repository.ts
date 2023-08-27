import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ProposalServiceRepository } from '@application/core/repositories';
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
        sendDate: proposalService.sendDate,

        installmentsBalance: proposalService.installmentsBalance,

        periodValidity: proposalService.periodValidity,

        discount: proposalService.discount,

        percentageEntry: proposalService.percentageEntry,

        guaranteePeriod: proposalService.guaranteePeriod,

        approved: proposalService.approved,

        clientId: proposalService.clientId,

        tenantId: proposalService.tenantId,
      },
    });

    return createdProposalService;
  }

  async get(id: number): Promise<ProposalService> {
    const getProposalService = await this.prisma.proposalService.findUnique({
      where: {
        id: id,
      },
    });

    return getProposalService;
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
  }: Omit<ProposalService, 'id'>): Promise<ProposalService[]> {
    const fetchProposalService = await this.prisma.proposalService.findMany({
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

    return fetchProposalService;
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
    }: Omit<ProposalService, 'id' | 'tenantId' | 'clientId'>,
  ): Promise<ProposalService> {
    const updatedProposalService = await this.prisma.proposalService.update({
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
