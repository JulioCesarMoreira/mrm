import { Well } from '@application/core/entities';
import { WellRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchWellUseCase {
  constructor(private wellRepository: WellRepository) {}

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
    const { deliveryDate } = filters;

    // converting datvscode-file://vscode-app/snap/code/137/usr/share/code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.htmle to save in RDS
    filters.deliveryDate = deliveryDate ? new Date(deliveryDate) : deliveryDate;

    const fetchWell = await this.wellRepository.fetch(filters);

    return fetchWell;
  }
}
