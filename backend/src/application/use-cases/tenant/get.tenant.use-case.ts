import { Injectable } from '@nestjs/common';
import { TenantRepository } from '@application/core/repositories';
import { Tenant } from '@application/core/entities';

@Injectable()
export class GetTenantUseCase {
  constructor(private tenantRepository: TenantRepository) {}

  async createTenant(tenantId: string): Promise<Tenant> {
    const createdTenant = await this.tenantRepository.get(tenantId);

    return createdTenant;
  }
}
