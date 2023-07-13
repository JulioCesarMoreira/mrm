import { Tenant } from '@prisma/client';

export abstract class ITenantRepository {
  abstract create(entity: Tenant): Promise<Tenant>;
}
