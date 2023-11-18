import { Row } from '@tanstack/react-table';

export interface InsertWellInput {
  voltage: string;
  totalDepth: number;
  sieveDepth: number;
  staticLevel: number;
  dynamicLevel: number;
  deliveryDate: string;
  sedimentaryDepth: number;
  distric: string;
  street: string;
  number: string;
  longitude: string;
  latitude: string;
  mapLink: string;
  proposalId: number;
  cityId: number;
}

export interface Well {
  id: string;
  clientName: string;
  voltage: string;
  totalDepth: number;
  sieveDepth: number;
  staticLevel: number;
  dynamicLevel: number;
  deliveryDate: string;
  sedimentaryDepth: number;
  distric: string;
  cep: string;
  street: string;
  number: string;
  longitude: string;
  latitude: string;
  mapLink: string;
  cityId: string;
  proposalServiceId: string;
  zipcode: string;
  proposalId: string;
  city: {
    id: string;
    uf: string;
    name: string;
  };
  client: {
    id: string;
    name: string;
    contactName: string;
    contactPhone: string;
    cpfCnpj: string;
    tenantId: string;
  };
}

export interface WellFields {
  voltage: string;
  totalDepth: number | undefined;
  sieveDepth: number | undefined;
  staticLevel: number | undefined;
  dynamicLevel: number | undefined;
  deliveryDate: string | undefined;
  sedimentaryDepth: number | undefined;
  street: string;
  number: string;
  distric: string;
  zipcode: string | undefined;
  longitude: string;
  latitude: string;
}

export interface WellProperty {
  well: Row<Well>;
}
