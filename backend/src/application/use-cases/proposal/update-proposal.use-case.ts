import { Proposal } from '@application/core/entities';
import { ProposalRepository } from '@application/core/repositories/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateProposalUseCase {
  constructor(private proposalRepository: ProposalRepository) {}

  async updateProposal(
    proposalId: number,
    proposalFields: Omit<Proposal, 'id' | 'tenantId' | 'clientId'>,
    tenantId: string,
  ): Promise<Proposal> {
    const { periodValidity, sendDate } = proposalFields;

    // converting the received dates in to a DATE type
    proposalFields.periodValidity = periodValidity
      ? new Date(periodValidity)
      : periodValidity;
    proposalFields.sendDate = sendDate ? new Date(sendDate) : sendDate;

    const updatedProposal = await this.proposalRepository.update(
      proposalId,
      proposalFields,
      tenantId,
    );
    return updatedProposal;
  }
}
