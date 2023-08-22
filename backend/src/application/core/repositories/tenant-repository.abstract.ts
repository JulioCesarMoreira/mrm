import { Tenant } from '@application/core/entities';

export abstract class ITenantRepository {
  abstract get(entityId: string): Promise<Tenant | null>;
}
