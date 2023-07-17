import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IClientRepository } from '@application/core/repositories';
import { Client } from '@application/core/entities';
import { PrismaClientMapper } from '../mappers/prisma-client.mapper';

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

  async get(id: number): Promise<Client> {
    const getClient = await this.prisma.client.findUnique({
      where: {
        id: Number(id),
      },
    });

    return getClient;
  }

  async fetch(tenantId: string): Promise<Client[]> {
    const fetchClient = await this.prisma.client.findMany({
      where: {
        tenantId,
      },
    });

    return fetchClient;
  }

  async update(entity: Client): Promise<Client> {
    const clientPrismaData = PrismaClientMapper.toPrisma(entity);

    const updatedClient = await this.prisma.client.update({
      where: {
        id: entity.id,
      },
      data: clientPrismaData,
    });

    return updatedClient;
  }
}
