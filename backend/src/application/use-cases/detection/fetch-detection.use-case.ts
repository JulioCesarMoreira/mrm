import { Detection } from '@application/core/entities';
import { DetectionRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchDetectionUseCase {
  constructor(private detectionRepository: DetectionRepository) {}

  async fetchDetection(filters: Omit<Detection, 'id'>): Promise<Detection[]> {
    const fetchDetection = await this.detectionRepository.fetch(filters);

    return fetchDetection;
  }
}
