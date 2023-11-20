import { Client } from '@application/core/entities';

export abstract class ClientRepository {
  abstract create(entity: Omit<Client, 'id'>): Promise<Client>;

  abstract get(id: number, tenantId: string): Promise<Client | null>;

  abstract fetch(
    filters: Omit<Client, 'id' | 'cpfCnpj' | 'tenantId'>,
    tenantId: string,
  ): Promise<Client[]>;

  abstract update(
    entityId: number,
    entityFields: Omit<Client, 'id' | 'cpfCnpj' | 'tenantId'>,
    tenantId: string,
  ): Promise<Client>;

  abstract delete(id: number, tenantId: string): Promise<boolean>;
}
