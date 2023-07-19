import { Client } from '@application/core/entities';
import { IClientRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchClienteUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async fetchClient(tenantId: string): Promise<Client[]> {
    const fetchCliente = await this.clientRepository.fetch(tenantId);

    return fetchCliente;
  }
}
