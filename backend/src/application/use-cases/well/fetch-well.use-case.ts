import { City, Client, Well } from '@application/core/entities';
import {
  CityRepository,
  ClientRepository,
  ProposalRepository,
  WellRepository,
} from '@application/core/repositories';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FetchWellUseCase {
  constructor(
    private wellRepository: WellRepository,
    private cityRepository: CityRepository,
    private clientRepository: ClientRepository,
    private proposalRepository: ProposalRepository,
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
  ): Promise<{ well: Well; city: City; client: Client }[]> {
    const { deliveryDate, startDate } = filters;
    const fetchWell = [] as { well: Well; client: Client; city: City }[];

    if (filters.deliveryDate || filters.startDate) {
      // converting date to use in RDS
      filters.deliveryDate = deliveryDate
        ? new Date(deliveryDate)
        : deliveryDate;

      filters.deliveryDate = startDate ? new Date(startDate) : startDate;

      if (filters.startDate.getTime() > filters.deliveryDate.getTime()) {
        throw new BadRequestException(
          'The start date have to be bigger then delivery date.',
        );
      }
    }

    const wells = await this.wellRepository.fetch(filters);

    for (const well of wells) {
      const city = await this.cityRepository.get(well.cityId);

      const proposal = await this.proposalRepository.get(well.proposalId);

      const client = await this.clientRepository.get(proposal.clientId);

      fetchWell.push({
        well,
        client,
        city,
      });
    }

    return fetchWell;
  }
}
