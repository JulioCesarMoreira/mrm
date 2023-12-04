import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { WellRepository } from '@application/core/repositories/database';
import { Well } from '@application/core/entities';

@Injectable()
export class PrismaWellRepository implements WellRepository {
  prisma = new PrismaClient();

  async create(well: Omit<Well, 'id'>): Promise<Well> {
    const createdWell = await this.prisma.well.create({
      data: {
        voltage: well.voltage,
        totalDepth: well.totalDepth,
        sieveDepth: well.sieveDepth,
        staticLevel: well.staticLevel,
        dynamicLevel: well.dynamicLevel,
        deliveryDate: well.deliveryDate,
        startDate: well.startDate,
        sedimentaryDepth: well.sedimentaryDepth,
        distric: well.distric,
        zipcode: well.zipcode,
        street: well.street,
        number: well.number,
        longitude: well.longitude,
        latitude: well.latitude,
        mapLink: well.mapLink,
        cityId: well.cityId,
        proposalId: well.proposalId,
      },
    });

    const wellEntity = {
      ...createdWell,
    };

    return wellEntity;
  }

  async get(id: number): Promise<Well> {
    const getWell = await this.prisma.well.findUnique({
      where: {
        id: id,
      },
    });

    const getCity = await this.prisma.city.findUnique({
      where: { id: getWell.cityId },
    });

    const wellEntity = { ...getWell, city: getCity };

    return wellEntity;
  }

  async fetch(
    {
      voltage,
      totalDepth,
      sieveDepth,
      staticLevel,
      dynamicLevel,
      startDate,
      deliveryDate,
      sedimentaryDepth,
      distric,
      zipcode,
      street,
      number,
      longitude,
      latitude,
      mapLink,
      cityId,
      proposalId,
    }: Omit<Well, 'id'>,
    tenantId: string,
  ): Promise<Well[]> {
    const fetchWell = await this.prisma.well.findMany({
      orderBy: {
        id: 'desc',
      },
      where: {
        ...(voltage && { voltage }),
        ...(totalDepth && { totalDepth }),
        ...(sieveDepth && { sieveDepth }),
        ...(staticLevel && { staticLevel }),
        ...(dynamicLevel && { dynamicLevel }),
        ...(startDate && { startDate }),
        ...(deliveryDate && { deliveryDate }),
        ...(sedimentaryDepth && { sedimentaryDepth }),
        ...(distric && { distric }),
        ...(zipcode && { zipcode }),
        ...(street && { street }),
        ...(number && { number }),
        ...(longitude && { longitude }),
        ...(latitude && { latitude }),
        ...(mapLink && { mapLink }),
        ...(cityId && { cityId }),
        ...(proposalId && { proposalId }),
        proposal: { tenantId: tenantId },
      },
    });

    return fetchWell;
  }

  async update(
    entityId: number,
    {
      voltage,
      totalDepth,
      sieveDepth,
      staticLevel,
      dynamicLevel,
      startDate,
      deliveryDate,
      sedimentaryDepth,
      distric,
      zipcode,
      street,
      number,
      longitude,
      latitude,
      mapLink,
      cityId,
    }: Omit<Well, 'id' | 'proposalId'>,
  ): Promise<Well> {
    const updatedWell = await this.prisma.well.update({
      where: {
        id: entityId,
      },
      data: {
        ...(voltage && { voltage }),
        ...(totalDepth && { totalDepth }),
        ...(sieveDepth && { sieveDepth }),
        ...(staticLevel && { staticLevel }),
        ...(dynamicLevel && { dynamicLevel }),
        ...(startDate && { startDate }),
        ...(deliveryDate && { deliveryDate }),
        ...(sedimentaryDepth && { sedimentaryDepth }),
        ...(distric && { distric }),
        ...(zipcode && { zipcode }),
        ...(street && { street }),
        ...(number && { number }),
        ...(longitude && { longitude }),
        ...(latitude && { latitude }),
        ...(mapLink && { mapLink }),
        ...(cityId && { cityId }),
      },
    });

    return updatedWell;
  }

  async delete(id: number): Promise<boolean> {
    const well = await this.prisma.well.delete({
      where: {
        id,
      },
    });

    return !!well || false;
  }
}
