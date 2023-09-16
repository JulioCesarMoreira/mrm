import { City } from '@application/core/entities';

export abstract class CityRepository {
  abstract get(id: number): Promise<City | null>;

  // abstract fetch(filters: Omit<City, 'id'>): Promise<City[]>;
}
