import { Client } from '@application/core/entities';

export type CreateClientDto = Omit<Client, 'id'>;

export type GetClientDto = {
  id: number;
};

export type FetchClientsDto = {
  id?: number;

  contactName?: string;

  contactPhone?: string;

  name?: string;

  tenantId?: string;
};

export type UpdateClientDto = {
  contactName?: string;

  contactPhone?: string;

  name?: string;
};
