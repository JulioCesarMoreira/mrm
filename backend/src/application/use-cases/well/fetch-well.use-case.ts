import { City, Client, Well } from '@application/core/entities';
import {
  CityRepository,
  ClientRepository,
  ProposalRepository,
  WellRepository,
} from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

class FetchedWell {
  well: Well;
  city: City;
  client: Client;
}

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
  ): Promise<FetchedWell[]> {
    const { deliveryDate } = filters;
    const fetchWell = [] as FetchedWell[];
    // converting date to use in RDS
    filters.deliveryDate = deliveryDate ? new Date(deliveryDate) : deliveryDate;

    const wells = await this.wellRepository.fetch(filters);

    for (const well of wells) {
      const [city, proposal] = await Promise.all([
        this.cityRepository.get(well.cityId),
        this.proposalRepository.get(well.proposalId),
      ]);

      const client = await this.clientRepository.get(proposal.clientId);

      fetchWell.push({
        well: well,
        city: city,
        client: client,
      });
    }

    return fetchWell;
  }
}
