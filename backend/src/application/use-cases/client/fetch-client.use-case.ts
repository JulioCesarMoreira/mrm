import { Client } from '@application/core/entities';
import { IClientRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchClienteUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async fetchClient(
    filters: Omit<Client, 'id' | 'cpfCnpj'>,
  ): Promise<Client[]> {
    const fetchCliente = await this.clientRepository.fetch(filters);

    return fetchCliente;
  }
}
