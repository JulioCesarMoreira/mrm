import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ItemServiceRepository } from '@application/core/repositories/database';
import { ItemService } from '@application/core/entities';

@Injectable()
export class PrismaItemServiceRepository implements ItemServiceRepository {
  prisma = new PrismaClient();

  async create(itemService: Omit<ItemService, 'id'>): Promise<ItemService> {
    const createdItemService = await this.prisma.itemService.create({
      data: {
        name: itemService.name,

        description: itemService.description,

        unit: itemService.unit,

        status: itemService.status,

        categoryServiceId: itemService.categoryServiceId,
      },
    });

    return createdItemService;
  }

  async get(id: number): Promise<ItemService> {
    const getItemService = await this.prisma.itemService.findUnique({
      where: {
        id: id,
      },
    });

    return getItemService;
  }

  async fetch({
    name,
    description,
    unit,
    status,
    categoryServiceId,
  }: Omit<ItemService, 'id'>): Promise<ItemService[]> {
    const fetchItemService = await this.prisma.itemService.findMany({
      where: {
        ...(name && { name: { contains: name } }),
        ...(description && { description: { contains: description } }),
        ...(unit && { unit }),
        ...(status && { status }),
        ...(categoryServiceId && { categoryServiceId }),
      },
    });

    return fetchItemService;
  }

  async update(
    entityId: number,
    { name, description, unit, status, categoryServiceId }: ItemService,
  ): Promise<ItemService> {
    const updatedItemService = await this.prisma.itemService.update({
      where: {
        id: entityId,
      },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(unit && { unit }),
        ...(status && { status }),
        ...(categoryServiceId && { categoryServiceId }),
      },
    });

    return updatedItemService;
  }

  async delete(id: number): Promise<boolean> {
    const itemService = await this.prisma.itemService.delete({
      where: {
        id,
      },
    });

    return !!itemService || false;
  }

  async fetchToProposal(tenantId: string): Promise<ItemService[]> {
    const fetchItemService = await this.prisma.itemService.findMany({
      where: {
        categoryService: {
          tenantId,
        },
      },
    });

    return fetchItemService;
  }
}
