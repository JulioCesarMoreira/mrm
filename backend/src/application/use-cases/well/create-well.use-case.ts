import { Injectable } from '@nestjs/common';
import { WellRepository } from '@application/core/repositories';
import { Well } from '@application/core/entities';

@Injectable()
export class CreateWellUseCase {
  constructor(
    private wellRepository: WellRepository, // private proposalServiceRepository: ProposalServiceRepository,
  ) {}

  async createWell(well: Omit<Well, 'id'>): Promise<Well> {
    const { deliveryDate } = well;

    // converting date to save in RDS
    well.deliveryDate = deliveryDate ? new Date(deliveryDate) : deliveryDate;

    // check if proposal service exits
    // const proposalServiceEntity = await this.proposalServiceRepository.get(
    //   proposalServiceId,
    // );

    // if (!proposalServiceEntity) {
    //   throw new BadRequestException('Proposal Service not found.');
    // }

    const createdWell = await this.wellRepository.create(well);

    return createdWell;
  }
}
