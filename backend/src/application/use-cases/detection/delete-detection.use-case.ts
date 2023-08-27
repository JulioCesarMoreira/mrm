import { Injectable } from '@nestjs/common';
import { DetectionRepository } from '@application/core/repositories';

@Injectable()
export class DeleteDetectionUseCase {
  constructor(private detectionRepository: DetectionRepository) {}

  async deleteDetection(id: number): Promise<boolean> {
    const deletedDetection = await this.detectionRepository.delete(id);

    return deletedDetection;
  }
}
