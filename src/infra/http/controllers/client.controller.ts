import { Body, Controller, Post } from '@nestjs/common';
import {
  CreateClientDto,
  CreateClientResponseDto,
} from '@application/core/dtos/client';
import { CreateClientUseCase } from '@application/use-cases/client';
import { ClientMapper } from '../mappers/client.mapper';

@Controller('/client')
export class ClientController {
  constructor(private createClientUseCase: CreateClientUseCase) {}

  @Post()
  async createClient(
    @Body() clientDto: CreateClientDto,
  ): Promise<CreateClientResponseDto> {
    const createClientResponse = new CreateClientResponseDto();

    try {
      const clientEntity = ClientMapper.createClientMapper(clientDto);

      const createdClient = await this.createClientUseCase.createClient(
        clientEntity,
      );

      createClientResponse.sucess = true;
      createClientResponse.createdClient = createdClient;
    } catch (error) {
      console.log(error);

      createClientResponse.sucess = false;
    }

    return createClientResponse;
  }
}
