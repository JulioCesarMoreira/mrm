import { Client } from '@application/core/entities';

export abstract class IClientRepository {
  abstract create(entity: Omit<Client, 'id'>): Promise<Client>;

  abstract get(id: number): Promise<Client | null>;

  abstract fetch(
    filters: Omit<Client, 'id' | 'cpfCnpj' | 'tenantId'>,
  ): Promise<Client[]>;

  abstract update(
    entityId: number,
    entityFields: Omit<Client, 'id' | 'cpfCnpj' | 'tenantId'>,
  ): Promise<Client>;

  abstract delete(id: number): Promise<boolean>;
}
