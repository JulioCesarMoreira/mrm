import { BadRequestException, Injectable } from '@nestjs/common';
import { CityRepository, WellRepository } from '@application/core/repositories';
import { City, Well } from '@application/core/entities';

interface WellResponse {
  well: Well;
  city: City;
}

@Injectable()
export class CreateWellUseCase {
  constructor(
    private wellRepository: WellRepository,
    private cityRepository: CityRepository,
  ) {}
  async createWell(wellDto: Omit<Well, 'id'>): Promise<WellResponse> {
    const { deliveryDate } = wellDto;

    // converting date to save in RDS
    wellDto.deliveryDate = deliveryDate ? new Date(deliveryDate) : deliveryDate;

    const city = await this.cityRepository.get(wellDto.cityId);

    if (!city) {
      new BadRequestException('City not found!');
    }

    const well = await this.wellRepository.create(wellDto);

    return { well, city };
  }
}
