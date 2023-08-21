import { Client } from '@application/core/entities';
import { IClientRepository } from '@application/core/repositories';
import { UpdateClientDto } from '@infra/http/dtos/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async updateClient(
    clientId: number,
    clientFields: UpdateClientDto,
  ): Promise<Client> {
    const updatedClient = await this.clientRepository.update(
      clientId,
      clientFields,
    );
    return updatedClient;
  }
}
