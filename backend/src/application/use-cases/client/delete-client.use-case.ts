import { Injectable } from '@nestjs/common';
import { ClientRepository } from '@application/core/repositories';

@Injectable()
export class DeleteClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async deleteClient(id: number, tenantId: string): Promise<boolean> {
    const deletedClient = await this.clientRepository.delete(id, tenantId);

    return deletedClient;
  }
}
