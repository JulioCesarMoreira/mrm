import { ProposalService } from '@application/core/entities';

export abstract class ProposalServiceRepository {
  abstract create(
    entity: Omit<ProposalService, 'id'>,
  ): Promise<ProposalService>;

  abstract get(id: number): Promise<ProposalService | null>;

  abstract fetch(
    filters: Omit<ProposalService, 'id' | 'categoryServiceId'>,
  ): Promise<ProposalService[]>;

  abstract update(
    entityId: number,
    entityFields: Omit<
      ProposalService,
      'id' | 'proposalId' | 'categoryServiceId'
    >,
  ): Promise<ProposalService>;

  abstract delete(id: number): Promise<boolean>;
}
