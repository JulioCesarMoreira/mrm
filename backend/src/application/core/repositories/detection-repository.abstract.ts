import { Detection } from '@application/core/entities';

export abstract class DetectionRepository {
  abstract create(entity: Omit<Detection, 'id'>): Promise<Detection>;

  abstract get(id: number): Promise<Detection | null>;

  abstract fetch(filters: Omit<Detection, 'id'>): Promise<Detection[]>;

  abstract update(
    entityId: number,
    entityFields: Omit<Detection, 'id' | 'proposalServiceId'>,
  ): Promise<Detection>;

  abstract delete(id: number): Promise<boolean>;
}
