import { Well } from '@application/core/entities';
import {
  WellRepository,
  ProposalServiceRepository,
} from '@application/core/repositories';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FetchWellUseCase {
  constructor(
    private wellRepository: WellRepository,
    private proposalServiceRepository: ProposalServiceRepository,
  ) {}

  async fetchWell(
    filters: Omit<
      Well,
      | 'id'
      | 'sieveDepth'
      | 'staticLevel'
      | 'dynamicLevel'
      | 'sedimentaryDepth'
      | 'distric'
      | 'number'
      | 'longitude'
      | 'latitude'
      | 'mapLink'
    >,
  ): Promise<Well[]> {
    const { proposalServiceId, deliveryDate } = filters;

    if (proposalServiceId) {
      const proposalService = await this.proposalServiceRepository.get(
        proposalServiceId,
      );

      if (!proposalService) {
        throw new BadRequestException('proposalService not found.');
      }
    }

    // converting date to save in RDS
    filters.deliveryDate = deliveryDate ? new Date(deliveryDate) : deliveryDate;

    const fetchWell = await this.wellRepository.fetch(filters);

    return fetchWell;
  }
}
