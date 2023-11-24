import { Well } from '@application/core/entities';

export abstract class WellRepository {
  abstract create(entity: Omit<Well, 'id'>): Promise<Well>;

  abstract get(id: number): Promise<Well | null>;

  abstract fetch(
    filters: Omit<
      Well,
      | 'id'
      | 'sieveDepth'
      | 'staticLevel'
      | 'dynamicLevel'
      | 'sedimentaryDepth'
      | 'distric'
      | 'number'
      | 'longitude'
      | 'latitude'
      | 'mapLink'
    >,
  ): Promise<Well[]>;

  abstract update(
    entityId: number,
    entityFields: Omit<Well, 'id' | 'proposalId'>,
  ): Promise<Well>;

  abstract delete(id: number): Promise<boolean>;
}
