import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateItemProposalServiceDto,
  CreateItemProposalServiceResponseDto,
  FetchItemProposalServicesDto,
  FetchItemProposalServicesResponseDto,
  GetItemProposalServiceIdDto,
  GetItemProposalServiceResponseDto,
  UpdateItemProposalServiceDto,
  UpdateItemProposalServiceResponseDto,
  DeleteItemProposalServiceResponseDto,
} from '@infra/http/dtos/itemProposalService';
import { ItemProposalServiceMapper } from '@infra/http/mappers/itemProposalService.mapper';
import {
  CreateItemProposalServiceUseCase,
  GetItemProposalServiceUseCase,
  FetchItemProposalServiceUseCase,
  UpdateItemProposalServiceUseCase,
  DeleteItemProposalServiceUseCase,
} from '@application/use-cases/itemProposalService';
import { ErrorResponseDto } from '@infra/http/dtos/error/error-response.dto';

@Controller('/itemProposalService')
export class ItemProposalServiceController {
  constructor(
    private createItemProposalServiceUseCase: CreateItemProposalServiceUseCase,
    private getItemProposalServiceUsecase: GetItemProposalServiceUseCase,
    private fetchItemProposalServicesUseCase: FetchItemProposalServiceUseCase,
    private updateItemProposalServiceUseCase: UpdateItemProposalServiceUseCase,
    private deleteItemProposalServiceUseCase: DeleteItemProposalServiceUseCase,
  ) {}

  @Post()
  async createItemProposalService(
    @Body() itemProposalServiceDto: CreateItemProposalServiceDto,
  ): Promise<CreateItemProposalServiceResponseDto | ErrorResponseDto> {
    try {
      const createdItemProposalService =
        await this.createItemProposalServiceUseCase.createItemProposalService(
          itemProposalServiceDto,
        );

      return createdItemProposalService;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get(':id')
  async getItemProposalService(
    @Param() parameters: GetItemProposalServiceIdDto,
  ): Promise<GetItemProposalServiceResponseDto | ErrorResponseDto> {
    try {
      const itemProposalServiceEntity =
        await this.getItemProposalServiceUsecase.getItemProposalService(
          Number(parameters.id),
        );
      return itemProposalServiceEntity;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get()
  async fetchItemProposalService(
    @Body() filters: FetchItemProposalServicesDto,
  ): Promise<FetchItemProposalServicesResponseDto | ErrorResponseDto> {
    try {
      const fetchItemProposalServicesList =
        await this.fetchItemProposalServicesUseCase.fetchItemProposalService(
          filters,
        );

      return ItemProposalServiceMapper.fetchItemProposalServiceToController(
        fetchItemProposalServicesList,
      );
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Patch(':id')
  async updateItemProposalService(
    @Param() parameters: GetItemProposalServiceIdDto,
    @Body() body: UpdateItemProposalServiceDto,
  ): Promise<UpdateItemProposalServiceResponseDto | ErrorResponseDto> {
    try {
      const updateItemProposalService =
        await this.updateItemProposalServiceUseCase.updateItemProposalService(
          Number(parameters.id),
          body,
        );

      return updateItemProposalService;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Delete(':id')
  async deleteItemProposalService(
    @Param() parameters: GetItemProposalServiceIdDto,
  ): Promise<DeleteItemProposalServiceResponseDto | ErrorResponseDto> {
    try {
      const deleteItemProposalService =
        await this.deleteItemProposalServiceUseCase.deleteItemProposalService(
          Number(parameters.id),
        );

      return ItemProposalServiceMapper.deleteItemProposalServiceToController(
        deleteItemProposalService,
      );
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }
}
