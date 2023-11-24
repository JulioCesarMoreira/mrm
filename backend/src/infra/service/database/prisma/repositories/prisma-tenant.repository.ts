import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TenantRepository } from '@application/core/repositories/database';
import { Tenant } from '@application/core/entities';

@Injectable()
export class PrismaTenantRepository implements TenantRepository {
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
