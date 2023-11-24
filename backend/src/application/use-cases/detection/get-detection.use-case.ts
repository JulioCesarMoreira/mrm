import { Detection } from '@application/core/entities';
import { DetectionRepository } from '@application/core/repositories/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetDetectionUseCase {
  constructor(private detectionRepository: DetectionRepository) {}

  async getDetection(id: number): Promise<Detection> {
    const getDetection = await this.detectionRepository.get(id);

    return getDetection;
  }
}
