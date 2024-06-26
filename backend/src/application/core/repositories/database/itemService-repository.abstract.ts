import { ItemService } from '@application/core/entities';

export abstract class ItemServiceRepository {
  abstract create(entity: Omit<ItemService, 'id'>): Promise<ItemService>;

  abstract get(id: number): Promise<ItemService | null>;

  abstract fetch(
    filters: Omit<ItemService, 'id' | 'cpfCnpj'>,
  ): Promise<ItemService[]>;

  abstract fetchToProposal(tenantId: string): Promise<ItemService[]>;

  abstract update(
    entityId: number,
    entityFields: Omit<ItemService, 'id'>,
  ): Promise<ItemService>;

  abstract delete(id: number): Promise<boolean>;
}
