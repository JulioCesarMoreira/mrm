import { City } from '@application/core/entities';

export class CreateWellResponseDto {
  id: number;

  voltage: 'V110' | 'V220';

  totalDepth: number;

  sieveDepth: number;

  staticLevel: number;

  dynamicLevel: number;

  startDate: Date;

  deliveryDate: Date;

  sedimentaryDepth: number;

  distric: string;

  zipcode: string;

  street: string;

  number: string;

  longitude: string;

  latitude: string;

  mapLink: string;

  city: CityDto;

  proposalId: number;
}

export class GetWellResponseDto {
  id: number;

  voltage: 'V110' | 'V220';

  totalDepth: number;

  sieveDepth: number;

  staticLevel: number;

  dynamicLevel: number;

  startDate: Date;

  deliveryDate: Date;

  sedimentaryDepth: number;

  distric: string;

  zipcode: string;

  street: string;

  number: string;

  longitude: string;

  latitude: string;

  mapLink: string;

  city: CityDto;

  proposalId: number;
}

export class FetchWellsResponseDto {
  wells: {
    id: number;

    voltage: 'V110' | 'V220';

    totalDepth: number;

    sieveDepth: number;

    staticLevel: number;

    dynamicLevel: number;

    startDate: Date;

    deliveryDate: Date;

    sedimentaryDepth: number;

    distric: string;

    zipcode: string;

    street: string;

    number: string;

    longitude: string;

    latitude: string;

    mapLink: string;

    city: CityDto;

    client: ClientDto;

    proposalId: number;
  }[];
}

export class DeleteWellResponseDto {
  sucess: boolean;
}

export class UpdateWellResponseDto {
  id: number;

  voltage: 'V110' | 'V220';

  totalDepth: number;

  sieveDepth: number;

  staticLevel: number;

  dynamicLevel: number;

  startDate: Date;

  deliveryDate: Date;

  sedimentaryDepth: number;

  distric: string;

  zipcode: string;

  street: string;

  number: string;

  longitude: string;

  latitude: string;

  mapLink: string;

  city: CityDto;

  proposalId: number;
}

class ClientDto {
  id: number;

  contactName: string;

  contactPhone: string;

  cpfCnpj: string;

  name: string;

  tenantId: string;
}

class CityDto {
  name: string;

  state: string;
}
