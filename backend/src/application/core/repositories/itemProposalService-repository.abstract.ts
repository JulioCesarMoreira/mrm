import { ItemProposalService } from '@application/core/entities';

export abstract class ItemProposalServiceRepository {
  abstract create(
    entity: Omit<ItemProposalService, 'id'>,
  ): Promise<ItemProposalService>;

  abstract get(id: number): Promise<ItemProposalService | null>;

  abstract fetch(
    filters: Omit<ItemProposalService, 'id'>,
  ): Promise<ItemProposalService[]>;

  abstract update(
    entityId: number,
    entityFields: Omit<ItemProposalService, 'id' | 'proposalServiceId'>,
  ): Promise<ItemProposalService>;

  abstract delete(id: number): Promise<boolean>;
}
