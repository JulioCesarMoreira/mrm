import { Client } from '@application/core/entities';
import { FetchClientsDto, UpdateClientDto } from '@infra/http/dtos/client';

export abstract class IClientRepository {
  abstract create(entity: Client): Promise<Client>;

  abstract get(id: number): Promise<Client | null>;

  abstract fetch(filters: FetchClientsDto): Promise<Client[]>;

  abstract update(
    entityId: number,
    entityFields: UpdateClientDto,
  ): Promise<Client>;

  abstract delete(id: number): Promise<boolean>;
}
