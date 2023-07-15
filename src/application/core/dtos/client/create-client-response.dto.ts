import { Client } from '@application/core/entities';

export class CreateClientResponseDto {
  sucess: boolean;

  createdClient: Client;
}
