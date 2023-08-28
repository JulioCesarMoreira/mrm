import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { WellRepository } from '@application/core/repositories';
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
        sedimentaryDepth: well.sedimentaryDepth,
        distric: well.distric,
        cep: well.cep,
        street: well.street,
        number: well.number,
        longitude: well.longitude,
        latitude: well.latitude,
        mapLink: well.mapLink,
        cityId: well.cityId,
        proposalServiceId: well.proposalServiceId,
      },
    });

    return createdWell;
  }

  async get(id: number): Promise<Well> {
    const getWell = await this.prisma.well.findUnique({
      where: {
        id: id,
      },
    });

    return getWell;
  }

  async fetch({
    voltage,
    totalDepth,
    sieveDepth,
    staticLevel,
    dynamicLevel,
    deliveryDate,
    sedimentaryDepth,
    distric,
    cep,
    street,
    number,
    longitude,
    latitude,
    mapLink,
    cityId,
    proposalServiceId,
  }: Omit<Well, 'id'>): Promise<Well[]> {
    const fetchWell = await this.prisma.well.findMany({
      where: {
        ...(voltage && { voltage }),
        ...(totalDepth && { totalDepth }),
        ...(sieveDepth && { sieveDepth }),
        ...(staticLevel && { staticLevel }),
        ...(dynamicLevel && { dynamicLevel }),
        ...(deliveryDate && { deliveryDate }),
        ...(sedimentaryDepth && { sedimentaryDepth }),
        ...(distric && { distric }),
        ...(cep && { cep }),
        ...(street && { street }),
        ...(number && { number }),
        ...(longitude && { longitude }),
        ...(latitude && { latitude }),
        ...(mapLink && { mapLink }),
        ...(cityId && { cityId }),
        ...(proposalServiceId && { proposalServiceId }),
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
      deliveryDate,
      sedimentaryDepth,
      distric,
      cep,
      street,
      number,
      longitude,
      latitude,
      mapLink,
      cityId,
    }: Omit<Well, 'id' | 'proposalServiceId'>,
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
        ...(deliveryDate && { deliveryDate }),
        ...(sedimentaryDepth && { sedimentaryDepth }),
        ...(distric && { distric }),
        ...(cep && { cep }),
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
