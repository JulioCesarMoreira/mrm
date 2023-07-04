import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts';
import { Tenant } from 'src/core/entities';

@Injectable()
export class TenantUseCases {
  constructor(private dataServices: IDataServices) {}

  async createTenant(tenant: Tenant): Promise<Tenant> {
    const createdTenant = await this.dataServices.tenant.create(tenant);

    return createdTenant;
  }
}
