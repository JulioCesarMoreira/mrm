import { Proposal } from '@application/core/entities';

export abstract class ProposalRepository {
  abstract create(entity: Omit<Proposal, 'id'>): Promise<Proposal>;

  abstract get(id: number, tenantId: string): Promise<Proposal | null>;

  abstract fetch(
    filters: Omit<Proposal, 'id' | 'tenantId'>,
    tenantId: string,
  ): Promise<Proposal[]>;

  abstract update(
    entityId: number,
    entityFields: Omit<Proposal, 'id' | 'tenantId' | 'clientId'>,
    tenantId: string,
  ): Promise<Proposal>;

  abstract delete(id: number, tenantId: string): Promise<boolean>;
}
