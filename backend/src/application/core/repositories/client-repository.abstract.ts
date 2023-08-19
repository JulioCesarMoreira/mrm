import { Client } from '@application/core/entities';
import {
  FetchCategoryServicesDto,
  UpdateCategoryServiceDto,
} from '@application/core/dtos/categoryService.dto';
import { CreateClientDto } from '@application/core/dtos/client.dto';

export abstract class IClientRepository {
  abstract create(entity: CreateClientDto): Promise<Client>;

  abstract get(id: number): Promise<Client | null>;

  abstract fetch(filters: FetchCategoryServicesDto): Promise<Client[]>;

  abstract update(
    entityId: number,
    entityFields: UpdateCategoryServiceDto,
  ): Promise<Client>;

  abstract delete(id: number): Promise<boolean>;
}
