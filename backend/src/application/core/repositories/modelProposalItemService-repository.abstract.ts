import { ModelProposalItemService } from '@application/core/entities';

export abstract class ModelProposalItemServiceRepository {
  abstract create(
    entity: Omit<ModelProposalItemService, 'id'>,
  ): Promise<ModelProposalItemService>;

  abstract get(id: number): Promise<ModelProposalItemService | null>;

  abstract fetch(
    filters: Omit<ModelProposalItemService, 'id'>,
  ): Promise<ModelProposalItemService[]>;

  abstract delete(id: number): Promise<boolean>;
}
