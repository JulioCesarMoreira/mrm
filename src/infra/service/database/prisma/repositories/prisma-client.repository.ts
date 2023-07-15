import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IClientRepository } from '@application/core/repositories';
import { Client } from '@application/core/entities';

@Injectable()
export class PrismaClientRepository implements IClientRepository {
  prisma = new PrismaClient();

  async create(client: Client): Promise<Client> {
    const createdClient = await this.prisma.client.create({
      data: {
        name: client.name,
        cpfCnpj: client.cpfCnpj,
        contactName: client.contactName,
        contactPhone: client.contactPhone,
        tenantId: client.tenantId,
      },
    });

    return createdClient;
  }
}