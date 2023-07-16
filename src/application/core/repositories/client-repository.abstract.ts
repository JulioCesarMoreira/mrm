import { Client } from '@prisma/client';

export abstract class IClientRepository {
  abstract create(entity: Client): Promise<Client>;

  abstract get(id: number): Promise<Client>;

  abstract fetch(tenantId: string): Promise<Client[]>;

  // abstract update(entity: Client): Promise<Client>;
}
