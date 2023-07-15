import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  CreateClientDto,
  CreateClientResponseDto,
  GetClientDto,
  GetClientResponseDto,
} from '@application/core/dtos/client';
import {
  CreateClientUseCase,
  GetClientUseCase,
} from '@application/use-cases/client';
import { ClientMapper } from '../mappers/client.mapper';

@Controller('/client')
export class ClientController {
  constructor(
    private createClientUseCase: CreateClientUseCase,
    private getClientUsecase: GetClientUseCase,
  ) {}

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

  @Get(':id')
  async getClient(
    @Param() parameters: GetClientDto,
  ): Promise<GetClientResponseDto> {
    let getClientResponse = new GetClientResponseDto();

    try {
      const clientEntity = await this.getClientUsecase.getClient(parameters.id);

      getClientResponse = ClientMapper.getClientMapper(clientEntity);
    } catch (error) {
      console.log('Error: ', error);
    }
    return getClientResponse;
  }
}
