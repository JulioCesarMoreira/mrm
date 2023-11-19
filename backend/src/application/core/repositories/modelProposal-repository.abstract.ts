import { ModelProposal } from '@application/core/entities';

export abstract class ModelProposalRepository {
  abstract create(entity: Omit<ModelProposal, 'id'>): Promise<ModelProposal>;

  abstract get(id: number, tenantId: string): Promise<ModelProposal | null>;

  abstract fetch(
    filters: Omit<ModelProposal, 'id'>,
    tenantId: string,
  ): Promise<ModelProposal[]>;

  abstract update(
    entityId: number,
    entityFields: Omit<ModelProposal, 'id' | 'tenantId'>,
    tenantId: string,
  ): Promise<ModelProposal>;

  abstract delete(id: number, tenantId: string): Promise<boolean>;
}
