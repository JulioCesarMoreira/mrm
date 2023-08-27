import { Detection } from '@application/core/entities';
import { DetectionRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateDetectionUseCase {
  constructor(private detectionRepository: DetectionRepository) {}

  async updateDetection(
    detectionId: number,
    detectionFields: Omit<Detection, 'id' | 'proposalServiceId'>,
  ): Promise<Detection> {
    const updatedDetection = await this.detectionRepository.update(
      detectionId,
      detectionFields,
    );
    return updatedDetection;
  }
}
