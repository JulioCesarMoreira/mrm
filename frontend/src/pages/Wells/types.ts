import { Row } from '@tanstack/react-table';

export interface Well {
  id: string;
  clientName: string;
  voltage: string;
  totalDepth: string;
  sieveDepth: string;
  staticLevel: string;
  dynamicLevel: string;
  deliveryDate: string;
  sedimentaryDepth: string;
  distric: string;
  cep: string;
  street: string;
  number: string;
  longitude: string;
  latitude: string;
  mapLink: string;
  cityId: string;
  proposalServiceId: string;
}

export interface WellProperty {
  well: Row<Well>;
}
