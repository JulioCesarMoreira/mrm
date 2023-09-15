import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateItemServiceDto,
  CreateItemServiceResponseDto,
  FetchItemServicesDto,
  FetchItemServicesResponseDto,
  GetItemServiceIdDto,
  GetItemServiceResponseDto,
  UpdateItemServiceDto,
  UpdateItemServiceResponseDto,
  DeleteItemServiceResponseDto,
} from '@infra/http/dtos/itemService';
import { ItemServiceMapper } from '@infra/http/mappers/itemService.mapper';
import {
  CreateItemServiceUseCase,
  GetItemServiceUseCase,
  FetchItemServiceUseCase,
  UpdateItemServiceUseCase,
  DeleteItemServiceUseCase,
} from '@application/use-cases/itemService';
import { ErrorResponseDto } from '@infra/http/dtos/error/error-response.dto';

@Controller('/itemService')
export class ItemServiceController {
  constructor(
    private createItemServiceUseCase: CreateItemServiceUseCase,
    private getItemServiceUsecase: GetItemServiceUseCase,
    private fetchItemServicesUseCase: FetchItemServiceUseCase,
    private updateItemServiceUseCase: UpdateItemServiceUseCase,
    private deleteItemServiceUseCase: DeleteItemServiceUseCase,
  ) {}

  @Post()
  async createItemService(
    @Body() itemServiceDto: CreateItemServiceDto,
  ): Promise<CreateItemServiceResponseDto | ErrorResponseDto> {
    try {
      const createdItemService =
        await this.createItemServiceUseCase.createItemService(itemServiceDto);

      return createdItemService;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get(':id')
  async getItemService(
    @Param() parameters: GetItemServiceIdDto,
  ): Promise<GetItemServiceResponseDto | ErrorResponseDto> {
    try {
      const itemServiceEntity = await this.getItemServiceUsecase.getItemService(
        Number(parameters.id),
      );

      return itemServiceEntity;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get()
  async fetchItemService(
    @Query() filters: FetchItemServicesDto,
  ): Promise<FetchItemServicesResponseDto | ErrorResponseDto> {
    try {
      const fetchItemServicesList =
        await this.fetchItemServicesUseCase.fetchItemService({
          ...filters,
          categoryServiceId: filters.categoryServiceId
            ? Number(filters.categoryServiceId)
            : undefined,
        });

      return ItemServiceMapper.fetchItemServiceToController(
        fetchItemServicesList,
      );
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Patch(':id')
  async updateItemService(
    @Param() parameters: GetItemServiceIdDto,
    @Body() body: UpdateItemServiceDto,
  ): Promise<UpdateItemServiceResponseDto | ErrorResponseDto> {
    try {
      const updateItemService =
        await this.updateItemServiceUseCase.updateItemService(
          Number(parameters.id),
          body,
        );

      return updateItemService;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Delete(':id')
  async deleteItemService(
    @Param() parameters: GetItemServiceIdDto,
  ): Promise<DeleteItemServiceResponseDto | ErrorResponseDto> {
    try {
      const deleteItemService =
        await this.deleteItemServiceUseCase.deleteItemService(
          Number(parameters.id),
        );

      return ItemServiceMapper.deleteItemServiceToController(deleteItemService);
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }
}
