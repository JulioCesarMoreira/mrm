import { City, Well } from '@application/core/entities';
import { CityRepository, WellRepository } from '@application/core/repositories';
import { BadRequestException, Injectable } from '@nestjs/common';

interface WellResponse {
  well: Well;
  city: City;
}
@Injectable()
export class UpdateWellUseCase {
  constructor(
    private wellRepository: WellRepository,
    private cityRepository: CityRepository,
  ) {}

  async updateWell(
    wellId: number,
    wellFields: Omit<Well, 'id' | 'proposalId'>,
  ): Promise<WellResponse> {
    const { deliveryDate, startDate } = wellFields;

    let city: City;
    if (wellFields.deliveryDate || wellFields.startDate) {
      // converting date to save in RDS
      wellFields.deliveryDate = deliveryDate
        ? new Date(deliveryDate)
        : deliveryDate;
      wellFields.startDate = startDate ? new Date(startDate) : startDate;

      if (wellFields.startDate.getTime() > wellFields.deliveryDate.getTime()) {
        throw new BadRequestException(
          'The start date have to be bigger then delivery date.',
        );
      }
    }
    if (wellFields.cityId) {
      city = await this.cityRepository.get(wellFields.cityId);

      if (!city) {
        throw new BadRequestException('City not found!');
      }
    }
    const well = await this.wellRepository.update(wellId, wellFields);
    return { well, city };
  }
}
