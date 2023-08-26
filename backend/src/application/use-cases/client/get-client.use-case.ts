import { Client } from '@application/core/entities';
import { ClientRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetClientUseCase {
  constructor(private clienteRepository: ClientRepository) {}

  async getClient(id: number): Promise<Client | null> {
    const getClient = await this.clienteRepository.get(id);

    return !!getClient ? getClient : null;
  }
}
