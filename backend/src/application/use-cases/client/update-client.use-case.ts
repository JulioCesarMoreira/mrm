import { Client } from '@application/core/entities';
import { IClientRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async updateClient(
    clientId: number,
    clientFields: Omit<Client, 'id' | 'cpfCnpj' | 'tenantId'>,
  ): Promise<Client> {
    const updatedClient = await this.clientRepository.update(
      clientId,
      clientFields,
    );
    return updatedClient;
  }
}
