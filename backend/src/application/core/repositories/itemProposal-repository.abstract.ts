import { ItemProposal } from '@application/core/entities';

export abstract class ItemProposalRepository {
  abstract create(entity: Omit<ItemProposal, 'id'>): Promise<ItemProposal>;

  abstract get(id: number): Promise<ItemProposal | null>;

  abstract fetch(filters: Omit<ItemProposal, 'id'>): Promise<ItemProposal[]>;

  abstract update(
    entityId: number,
    entityFields: Omit<ItemProposal, 'id' | 'proposalId'>,
  ): Promise<ItemProposal>;

  abstract delete(id: number): Promise<boolean>;
}
