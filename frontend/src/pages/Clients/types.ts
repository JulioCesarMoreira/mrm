import { Row } from '@tanstack/react-table';

export interface Client {
  id: string;
  name: string;
  cpfCnpj: string;
  contactPhone: string;
}

export interface ClientFields {
  id?: string;
  name: string;
  cpfCnpj: string;
  contactPhone: string;
}

export interface ClientProperty {
  client: Row<Client>;
}
