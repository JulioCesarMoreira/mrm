import { Client } from '@application/core/entities';

export type CreateClientDto = Omit<Client, 'id'>;
