import { City, Well } from '@application/core/entities';
import { CityRepository, WellRepository } from '@application/core/repositories';
import { BadRequestException, Injectable } from '@nestjs/common';

interface WellResponse {
  well: Well;
  city: City;
}

@Injectable()
export class GetWellUseCase {
  constructor(
    private wellRepository: WellRepository,
    private cityRepository: CityRepository,
  ) {}

  async getWell(id: number): Promise<WellResponse> {
    const well = await this.wellRepository.get(id);

    if (!well) {
      throw new BadRequestException('Well not found.');
    }

    const city = await this.cityRepository.get(well.cityId);

    if (!city) {
      throw new BadRequestException('City not found!');
    }

    return { well, city };
  }
}
