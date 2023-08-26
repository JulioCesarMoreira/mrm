import { ProposalService } from '@application/core/entities';

export abstract class ProposalServiceRepository {
  abstract create(
    entity: Omit<ProposalService, 'id'>,
  ): Promise<ProposalService>;

  abstract get(id: number): Promise<ProposalService | null>;

  abstract fetch(
    filters: Omit<ProposalService, 'id'>,
  ): Promise<ProposalService[]>;

  abstract update(
    entityId: number,
    entityFields: Omit<ProposalService, 'id' | 'tenantId' | 'clientId'>,
  ): Promise<ProposalService>;

  abstract delete(id: number): Promise<boolean>;
}
