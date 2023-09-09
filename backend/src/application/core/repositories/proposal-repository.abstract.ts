import { Proposal } from '@application/core/entities';

export abstract class ProposalRepository {
  abstract create(entity: Omit<Proposal, 'id'>): Promise<Proposal>;

  abstract get(id: number): Promise<Proposal | null>;

  abstract fetch(filters: Omit<Proposal, 'id'>): Promise<Proposal[]>;

  abstract update(
    entityId: number,
    entityFields: Omit<Proposal, 'id' | 'tenantId' | 'clientId'>,
  ): Promise<Proposal>;

  abstract delete(id: number): Promise<boolean>;
}
