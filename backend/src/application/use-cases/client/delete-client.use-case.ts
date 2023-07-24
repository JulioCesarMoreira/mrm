import { Injectable } from '@nestjs/common';
import { IClientRepository } from '@application/core/repositories';

@Injectable()
export class DeleteClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async deleteClient(id: number): Promise<boolean> {
    const deletedClient = await this.clientRepository.delete(id);

    return deletedClient;
  }
}
