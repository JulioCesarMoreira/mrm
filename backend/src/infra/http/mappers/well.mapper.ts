import {
  DeleteWellResponseDto,
  FetchWellsResponseDto,
} from '@infra/http/dtos/well';
import { Well } from '@application/core/entities';

export class WellMapper {
  public static fetchWellToController(
    wellsEntity: Well[],
  ): FetchWellsResponseDto {
    const fetchWellsResponseDto = new FetchWellsResponseDto();
    fetchWellsResponseDto.wells = [];

    for (const well of wellsEntity) {
      fetchWellsResponseDto.wells.push({
        id: well.id,
        voltage: well.voltage,
        totalDepth: well.totalDepth,
        sieveDepth: well.sieveDepth,
        staticLevel: well.staticLevel,
        dynamicLevel: well.dynamicLevel,
        deliveryDate: well.deliveryDate,
        sedimentaryDepth: well.sedimentaryDepth,
        distric: well.distric,
        cep: well.cep,
        street: well.street,
        number: well.number,
        longitude: well.longitude,
        latitude: well.latitude,
        mapLink: well.mapLink,
        cityId: well.cityId,
        proposalServiceId: well.proposalServiceId,
      });
    }

    return fetchWellsResponseDto;
  }

  public static deleteWellToController(
    resultDelete: boolean,
  ): DeleteWellResponseDto {
    const deleteWellResponseDto = new DeleteWellResponseDto();

    deleteWellResponseDto.sucess = resultDelete;

    return deleteWellResponseDto;
  }
}
