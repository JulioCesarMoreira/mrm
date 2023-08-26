import { Tenant } from '@application/core/entities';

export abstract class TenantRepository {
  abstract get(entityId: string): Promise<Tenant | null>;
}
