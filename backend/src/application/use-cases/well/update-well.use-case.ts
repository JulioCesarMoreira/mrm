import { Well } from '@application/core/entities';
import { WellRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateWellUseCase {
  constructor(private wellRepository: WellRepository) {}

  async updateWell(
    wellId: number,
    wellFields: Omit<Well, 'id' | 'proposalId'>,
  ): Promise<Well> {
    const { deliveryDate } = wellFields;

    // converting date to save in RDS
    wellFields.deliveryDate = deliveryDate
      ? new Date(deliveryDate)
      : deliveryDate;

    const updatedWell = await this.wellRepository.update(wellId, wellFields);
    return updatedWell;
  }
}
