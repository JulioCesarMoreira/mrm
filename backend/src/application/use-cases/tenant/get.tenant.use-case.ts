import { Injectable } from '@nestjs/common';
import { ITenantRepository } from '@application/core/repositories';
import { Tenant } from '@application/core/entities';

@Injectable()
export class GetTenantUseCase {
  constructor(private tenantRepository: ITenantRepository) {}

  async createTenant(tenantId: string): Promise<Tenant> {
    const createdTenant = await this.tenantRepository.get(tenantId);

    return createdTenant;
  }
}
