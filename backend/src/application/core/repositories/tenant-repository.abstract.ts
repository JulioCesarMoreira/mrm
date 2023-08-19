import { Tenant } from '@application/core/entities';

export abstract class ITenantRepository {
  abstract create(entity: Tenant): Promise<Tenant>;
}
