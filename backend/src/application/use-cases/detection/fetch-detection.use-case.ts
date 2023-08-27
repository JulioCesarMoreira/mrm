import { Detection } from '@application/core/entities';
import {
  DetectionRepository,
  ProposalServiceRepository,
} from '@application/core/repositories';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FetchDetectionUseCase {
  constructor(
    private detectionRepository: DetectionRepository,
    private proposalServiceRepository: ProposalServiceRepository,
  ) {}

  async fetchDetection(filters: Omit<Detection, 'id'>): Promise<Detection[]> {
    const { proposalServiceId } = filters;

    const proposalService = await this.proposalServiceRepository.get(
      proposalServiceId,
    );

    if (!proposalService) {
      throw new BadRequestException('proposalService not found.');
    }

    const fetchDetection = await this.detectionRepository.fetch(filters);

    return fetchDetection;
  }
}
