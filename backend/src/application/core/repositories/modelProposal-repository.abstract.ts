import { ModelProposal } from '@application/core/entities';

export abstract class ModelProposalRepository {
  abstract create(entity: Omit<ModelProposal, 'id'>): Promise<ModelProposal>;

  abstract get(id: number): Promise<ModelProposal | null>;

  abstract fetch(filters: Omit<ModelProposal, 'id'>): Promise<ModelProposal[]>;

  abstract update(
    entityId: number,
    entityFields: Omit<ModelProposal, 'id' | 'tenantId'>,
  ): Promise<ModelProposal>;

  abstract delete(id: number): Promise<boolean>;
}
