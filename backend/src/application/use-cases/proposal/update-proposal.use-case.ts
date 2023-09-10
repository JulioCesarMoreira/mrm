import { Proposal } from '@application/core/entities';
import { ProposalRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateProposalUseCase {
  constructor(private proposalRepository: ProposalRepository) {}

  async updateProposal(
    proposalId: number,
    proposalFields: Omit<Proposal, 'id' | 'tenantId' | 'clientId'>,
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
    );
    return updatedProposal;
  }
}
