export class CreateWellResponseDto {
  id: number;

  voltage: 'V110' | 'V220';

  totalDepth: number;

  sieveDepth: number;

  staticLevel: number;

  dynamicLevel: number;

  deliveryDate: Date;

  sedimentaryDepth: number;

  distric: string;

  zipcode: string;

  street: string;

  number: string;

  longitude: string;

  latitude: string;

  mapLink: string;

  cityId: number;

  proposalId: number;
}

export class GetWellResponseDto {
  id: number;

  voltage: 'V110' | 'V220';

  totalDepth: number;

  sieveDepth: number;

  staticLevel: number;

  dynamicLevel: number;

  deliveryDate: Date;

  sedimentaryDepth: number;

  distric: string;

  zipcode: string;

  street: string;

  number: string;

  longitude: string;

  latitude: string;

  mapLink: string;

  cityId: number;

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

    deliveryDate: Date;

    sedimentaryDepth: number;

    distric: string;

    zipcode: string;

    street: string;

    number: string;

    longitude: string;

    latitude: string;

    mapLink: string;

    cityId: number;

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

  deliveryDate: Date;

  sedimentaryDepth: number;

  distric: string;

  zipcode: string;

  street: string;

  number: string;

  longitude: string;

  latitude: string;

  mapLink: string;

  cityId: number;

  proposalId: number;
}
