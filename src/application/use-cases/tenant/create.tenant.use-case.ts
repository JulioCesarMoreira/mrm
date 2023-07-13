import { Injectable } from '@nestjs/common';
import { ITenantRepository } from '@application/core/repositories';
import { Tenant } from '@application/core/entities';

@Injectable()
export class CreateTenantUseCase {
  constructor(private tenantRepository: ITenantRepository) {}

  async createTenant(tenant: Tenant): Promise<Tenant> {
    const createdTenant = await this.tenantRepository.create(tenant);

    return createdTenant;
  }
}
