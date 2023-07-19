import { Client } from '@application/core/entities';
import { Client as PrismaModelClient } from '@prisma/client';

export class PrismaClientMapper {
  public static toPrisma(clientEntity: Client): PrismaModelClient {
    return {
      id: clientEntity.id,
      name: clientEntity.name,
      cpfCnpj: clientEntity.cpfCnpj,
      contactPhone: clientEntity.contactPhone,
      contactName: clientEntity.contactName,
      tenantId: clientEntity.tenantId,
    };
  }
}
