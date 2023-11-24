import { Detection } from '@application/core/entities';
import { DetectionRepository } from '@application/core/repositories/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateDetectionUseCase {
  constructor(private detectionRepository: DetectionRepository) {}

  async updateDetection(
    detectionId: number,
    detectionFields: Omit<Detection, 'id' | 'proposalId'>,
  ): Promise<Detection> {
    const updatedDetection = await this.detectionRepository.update(
      detectionId,
      detectionFields,
    );
    return updatedDetection;
  }
}
