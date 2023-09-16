import {
  CreateWellResponseDto,
  DeleteWellResponseDto,
  FetchWellsResponseDto,
} from '@infra/http/dtos/well';
import { City, Client, Well } from '@application/core/entities';

interface WellFetchUseCaseResponse {
  well: Well;
  city: City;
  client: Client;
}

interface WellUseCaseResponse {
  well: Well;
  city: City;
}
export class WellMapper {
  public static fetchWellToController(
    wellsEntity: WellFetchUseCaseResponse[],
  ): FetchWellsResponseDto {
    const fetchWellsResponseDto = new FetchWellsResponseDto();
    fetchWellsResponseDto.wells = [];

    for (const wellEntity of wellsEntity) {
      fetchWellsResponseDto.wells.push({
        id: wellEntity.well.id,
        voltage: wellEntity.well.voltage,
        totalDepth: wellEntity.well.totalDepth,
        sieveDepth: wellEntity.well.sieveDepth,
        staticLevel: wellEntity.well.staticLevel,
        dynamicLevel: wellEntity.well.dynamicLevel,
        deliveryDate: wellEntity.well.deliveryDate,
        sedimentaryDepth: wellEntity.well.sedimentaryDepth,
        distric: wellEntity.well.distric,
        zipcode: wellEntity.well.zipcode,
        street: wellEntity.well.street,
        number: wellEntity.well.number,
        longitude: wellEntity.well.longitude,
        latitude: wellEntity.well.latitude,
        mapLink: wellEntity.well.mapLink,
        city: wellEntity.city,
        client: wellEntity.client,
        proposalId: wellEntity.well.proposalId,
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

  public static createWellToController(
    wellResponse: WellUseCaseResponse,
  ): CreateWellResponseDto {
    const createWellResponseDto = new CreateWellResponseDto();

    createWellResponseDto.id = wellResponse.well.id;
    createWellResponseDto.voltage = wellResponse.well.voltage;
    createWellResponseDto.totalDepth = wellResponse.well.totalDepth;
    createWellResponseDto.sieveDepth = wellResponse.well.sieveDepth;
    createWellResponseDto.staticLevel = wellResponse.well.staticLevel;
    createWellResponseDto.dynamicLevel = wellResponse.well.dynamicLevel;
    createWellResponseDto.deliveryDate = wellResponse.well.deliveryDate;
    createWellResponseDto.sedimentaryDepth = wellResponse.well.sedimentaryDepth;
    createWellResponseDto.distric = wellResponse.well.distric;
    createWellResponseDto.zipcode = wellResponse.well.zipcode;
    createWellResponseDto.street = wellResponse.well.street;
    createWellResponseDto.number = wellResponse.well.number;
    createWellResponseDto.longitude = wellResponse.well.longitude;
    createWellResponseDto.latitude = wellResponse.well.latitude;
    createWellResponseDto.mapLink = wellResponse.well.mapLink;
    createWellResponseDto.city = wellResponse.city;
    createWellResponseDto.proposalId = wellResponse.well.proposalId;

    return createWellResponseDto;
  }

  public static updateWellToController(
    wellResponse: WellUseCaseResponse,
  ): CreateWellResponseDto {
    const createWellResponseDto = new CreateWellResponseDto();

    createWellResponseDto.id = wellResponse.well.id;
    createWellResponseDto.voltage = wellResponse.well.voltage;
    createWellResponseDto.totalDepth = wellResponse.well.totalDepth;
    createWellResponseDto.sieveDepth = wellResponse.well.sieveDepth;
    createWellResponseDto.staticLevel = wellResponse.well.staticLevel;
    createWellResponseDto.dynamicLevel = wellResponse.well.dynamicLevel;
    createWellResponseDto.deliveryDate = wellResponse.well.deliveryDate;
    createWellResponseDto.sedimentaryDepth = wellResponse.well.sedimentaryDepth;
    createWellResponseDto.distric = wellResponse.well.distric;
    createWellResponseDto.zipcode = wellResponse.well.zipcode;
    createWellResponseDto.street = wellResponse.well.street;
    createWellResponseDto.number = wellResponse.well.number;
    createWellResponseDto.longitude = wellResponse.well.longitude;
    createWellResponseDto.latitude = wellResponse.well.latitude;
    createWellResponseDto.mapLink = wellResponse.well.mapLink;
    createWellResponseDto.city = wellResponse.city;
    createWellResponseDto.proposalId = wellResponse.well.proposalId;

    return createWellResponseDto;
  }
}
