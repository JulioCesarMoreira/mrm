import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ClientRepository } from '@application/core/repositories';
import { Client } from '@application/core/entities';
import { FetchClientsDto, UpdateClientDto } from '@infra/http/dtos/client';

@Injectable()
export class PrismaClientRepository implements ClientRepository {
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
        id: id,
      },
    });

    return getClient;
  }

  async fetch({
    contactName,
    contactPhone,
    name,
    tenantId,
  }: FetchClientsDto): Promise<Client[]> {
    const fetchClient = await this.prisma.client.findMany({
      where: {
        ...(contactName && { contactName: { contains: contactName } }),
        ...(contactPhone && { contactPhone: { contains: contactPhone } }),
        ...(name && { name: { contains: name } }),
        ...(tenantId && { tenantId }),
      },
    });

    return fetchClient;
  }

  async update(
    entityId: number,
    { contactName, contactPhone, name }: UpdateClientDto,
  ): Promise<Client> {
    const updatedClient = await this.prisma.client.update({
      where: {
        id: entityId,
      },
      data: {
        ...(contactName && { contactName }),
        ...(contactPhone && { contactPhone }),
        ...(name && { name }),
      },
    });

    return updatedClient;
  }

  async delete(id: number): Promise<boolean> {
    const client = await this.prisma.client.delete({
      where: {
        id,
      },
    });

    return !!client || false;
  }
}
