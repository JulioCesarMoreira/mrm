import { ProposalService } from '@application/core/entities';
import { ProposalServiceRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateProposalServiceUseCase {
  constructor(private proposalServiceRepository: ProposalServiceRepository) {}

  async updateProposalService(
    proposalServiceId: number,
    proposalServiceFields: Omit<
      ProposalService,
      'id' | 'tenantId' | 'clientId'
    >,
  ): Promise<ProposalService> {
    const { periodValidity, sendDate } = proposalServiceFields;

    // converting the received dates in to a DATE type
    proposalServiceFields.periodValidity = periodValidity
      ? new Date(periodValidity)
      : periodValidity;
    proposalServiceFields.sendDate = sendDate ? new Date(sendDate) : sendDate;

    const updatedProposalService = await this.proposalServiceRepository.update(
      proposalServiceId,
      proposalServiceFields,
    );
    return updatedProposalService;
  }
}
