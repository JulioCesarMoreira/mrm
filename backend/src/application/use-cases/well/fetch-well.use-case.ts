import { City, Client, Well } from '@application/core/entities';
import {
  CityRepository,
  ClientRepository,
  ProposalRepository,
  WellRepository,
} from '@application/core/repositories/database';
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
    tenantId: string,
  ): Promise<{ well: Well; city: City; client: Client }[]> {
    const { deliveryDate, startDate } = filters;
    const fetchWell = [] as { well: Well; client: Client; city: City }[];

    if (deliveryDate) {
      // converting date to save in RDS
      filters.deliveryDate = deliveryDate
        ? new Date(deliveryDate)
        : deliveryDate;
    }

    if (startDate) {
      // converting date to save in RDS
      filters.startDate = startDate ? new Date(startDate) : startDate;
    }

    const wells = await this.wellRepository.fetch(filters, tenantId);

    for (const well of wells) {
      const city = await this.cityRepository.get(well.cityId);

      const proposal = await this.proposalRepository.get(
        well.proposalId,
        tenantId,
      );

      const client = await this.clientRepository.get(
        proposal.clientId,
        tenantId,
      );

      fetchWell.push({
        well,
        client,
        city,
      });
    }

    return fetchWell;
  }
}
