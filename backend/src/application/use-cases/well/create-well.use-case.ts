import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CityRepository,
  WellRepository,
} from '@application/core/repositories/database';
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
    const { deliveryDate, startDate } = wellDto;

    // converting date to save in RDS
    wellDto.deliveryDate = deliveryDate
      ? new Date(new Date(deliveryDate).toISOString().split('T')[0])
      : deliveryDate;
    wellDto.startDate = startDate ? new Date(startDate) : startDate;

    if (
      deliveryDate &&
      startDate &&
      wellDto.startDate.getTime() > wellDto.deliveryDate.getTime()
    ) {
      throw new BadRequestException(
        'The start date have to be bigger then delivery date.',
      );
    }

    const city = await this.cityRepository.get(wellDto.cityId);

    if (!city) {
      throw new BadRequestException('City not found!');
    }

    const well = await this.wellRepository.create(wellDto);

    return { well, city };
  }
}
