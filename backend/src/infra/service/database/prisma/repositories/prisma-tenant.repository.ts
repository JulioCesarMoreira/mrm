import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ITenantRepository } from '@application/core/repositories';
import { Tenant } from '@application/core/entities';

@Injectable()
export class PrismaTenantRepository implements ITenantRepository {
  prisma = new PrismaClient();

  async get(tenantId: string): Promise<Tenant | null> {
    const getTenant = await this.prisma.tenant.findUnique({
      where: {
        id: tenantId,
      },
    });

    return !!getTenant ? getTenant : null;
  }
}
