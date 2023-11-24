import { Injectable } from '@nestjs/common';
import { DetectionRepository } from '@application/core/repositories/database';
import { Detection } from '@application/core/entities';

@Injectable()
export class CreateDetectionUseCase {
  constructor(private detectionRepository: DetectionRepository) {}

  async createDetection(detection: Omit<Detection, 'id'>): Promise<Detection> {
    const createdDetection = await this.detectionRepository.create(detection);

    return createdDetection;
  }
}
