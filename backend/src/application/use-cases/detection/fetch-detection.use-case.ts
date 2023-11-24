import { Detection } from '@application/core/entities';
import {
  DetectionRepository,
  ProposalRepository,
} from '@application/core/repositories/database';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FetchDetectionUseCase {
  constructor(
    private detectionRepository: DetectionRepository,
    private proposalRepository: ProposalRepository,
  ) {}

  async fetchDetection(
    filters: Omit<Detection, 'id'>,
    tenantId: string,
  ): Promise<Detection[]> {
    const { proposalId } = filters;

    if (proposalId) {
      const proposal = await this.proposalRepository.get(proposalId, tenantId);

      if (!proposal) {
        throw new BadRequestException('proposal not found.');
      }
    }

    const fetchDetection = await this.detectionRepository.fetch(filters);

    return fetchDetection;
  }
}
