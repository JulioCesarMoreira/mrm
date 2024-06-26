import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CityRepository } from '@application/core/repositories/database';
import { City } from '@application/core/entities';

@Injectable()
export class PrismaCityRepository implements CityRepository {
  prisma = new PrismaClient();

  async get(id: number): Promise<City> {
    const getCity = await this.prisma.city.findUnique({
      where: {
        id: id,
      },
    });

    return getCity;
  }

  async getByNameAndState(
    name: string,
    state: 'PR' | 'SC' | 'SP',
  ): Promise<City> {
    const getCity = await this.prisma.city.findFirst({
      where: {
        name: name,
        state: state,
      },
    });

    return getCity;
  }
}
