import { Client } from '@application/core/entities';

export type CreateClientDto = Omit<Client, 'id'>;

export type GetClientDto = {
  id: number;
};
