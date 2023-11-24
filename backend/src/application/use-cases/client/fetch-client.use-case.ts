import { Client } from '@application/core/entities';
import { ClientRepository } from '@application/core/repositories/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchClienteUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async fetchClient(
    filters: Omit<Client, 'id' | 'cpfCnpj' | 'tenantId'>,
    tenantId: string,
  ): Promise<Client[]> {
    const fetchCliente = await this.clientRepository.fetch(filters, tenantId);

    return fetchCliente;
  }
}
