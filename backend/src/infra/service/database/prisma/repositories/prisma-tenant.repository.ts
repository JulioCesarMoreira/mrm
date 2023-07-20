import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ITenantRepository } from '@application/core/repositories';
import { Tenant } from '@application/core/entities';

@Injectable()
export class PrismaTenantRepository implements ITenantRepository {
  prisma = new PrismaClient();

  async create(tenant: Tenant): Promise<Tenant> {
    const createdTenant = await this.prisma.tenant.create({
      data: {
        id: tenant.id,
        cognitoId: tenant.cognitoId,
      },
    });

    return createdTenant;
  }
}
