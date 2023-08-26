import { Injectable } from '@nestjs/common';
import { ClientRepository } from '@application/core/repositories';

@Injectable()
export class DeleteClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async deleteClient(id: number): Promise<boolean> {
    const deletedClient = await this.clientRepository.delete(id);

    return deletedClient;
  }
}
