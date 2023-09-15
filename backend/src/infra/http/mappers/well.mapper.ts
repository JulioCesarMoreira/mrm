import {
  DeleteWellResponseDto,
  FetchWellsResponseDto,
} from '@infra/http/dtos/well';
import { City, Client, Well } from '@application/core/entities';

class FetchedWell {
  well: Well;
  city: City;
  client: Client;
}
export class WellMapper {
  public static fetchWellToController(
    wellsEntity: FetchedWell[],
  ): FetchWellsResponseDto {
    const fetchWellsResponseDto = new FetchWellsResponseDto();
    fetchWellsResponseDto.wells = [];

    for (const well of wellsEntity) {
      fetchWellsResponseDto.wells.push({
        id: well.well.id,
        voltage: well.well.voltage,
        totalDepth: well.well.totalDepth,
        sieveDepth: well.well.sieveDepth,
        staticLevel: well.well.staticLevel,
        dynamicLevel: well.well.dynamicLevel,
        deliveryDate: well.well.deliveryDate,
        sedimentaryDepth: well.well.sedimentaryDepth,
        distric: well.well.distric,
        zipcode: well.well.zipcode,
        street: well.well.street,
        number: well.well.number,
        longitude: well.well.longitude,
        latitude: well.well.latitude,
        mapLink: well.well.mapLink,
        city: well.city,
        client: well.client,
        proposalId: well.well.proposalId,
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
