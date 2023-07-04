import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from 'src/core/dtos/tenant';
import { Tenant } from 'src/core/entities';

@Injectable()
export class TenantFactoryService {
  createTenant(createTenantDto: CreateTenantDto): Tenant {
    const tenant = new Tenant();
    tenant.id = createTenantDto.id;
    tenant.cognitoId = createTenantDto.cognitoId;
    return tenant;
  }
}
