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
  FetchItemServiceeUseCase,
  UpdateItemServiceUseCase,
  DeleteItemServiceUseCase,
} from '@application/use-cases/itemService';
import { Prisma } from '@prisma/client';

@Controller('/itemService')
export class ItemServiceController {
  constructor(
    private createItemServiceUseCase: CreateItemServiceUseCase,
    private getItemServiceUsecase: GetItemServiceUseCase,
    private fetchItemServicesUseCase: FetchItemServiceeUseCase,
    private updateItemServiceUseCase: UpdateItemServiceUseCase,
    private deleteItemServiceUseCase: DeleteItemServiceUseCase,
  ) {}

  @Post()
  async createItemService(
    @Body() itemServiceDto: CreateItemServiceDto,
  ): Promise<CreateItemServiceResponseDto> {
    let createItemServiceResponse = new CreateItemServiceResponseDto();

    try {
      const createdItemService =
        await this.createItemServiceUseCase.createItemService(itemServiceDto);

      createItemServiceResponse = createdItemService;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Prisma.PrismaClientKnownRequestError(error.message, error);
      }
    }

    return createItemServiceResponse;
  }

  @Get(':id')
  async getItemService(
    @Param() parameters: GetItemServiceIdDto,
  ): Promise<GetItemServiceResponseDto> {
    let getItemServiceResponse = {} as GetItemServiceResponseDto;

    try {
      const itemServiceEntity = await this.getItemServiceUsecase.getItemService(
        Number(parameters.id),
      );
      getItemServiceResponse = itemServiceEntity;
    } catch (error) {
      console.log('Error: ', error);
    }
    return getItemServiceResponse;
  }

  @Get()
  async fetchItemServiceByTenant(
    @Body() filters: FetchItemServicesDto,
  ): Promise<FetchItemServicesResponseDto> {
    let fetchCLientsResponse = new FetchItemServicesResponseDto();

    try {
      const fetchItemServicesList =
        await this.fetchItemServicesUseCase.fetchItemService(filters);

      fetchCLientsResponse = ItemServiceMapper.fetchItemServiceToController(
        fetchItemServicesList,
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Prisma.PrismaClientKnownRequestError(error.message, error);
      }
    }

    return fetchCLientsResponse;
  }

  @Patch(':id')
  async updateItemService(
    @Param() parameters: GetItemServiceIdDto,
    @Body() body: UpdateItemServiceDto,
  ): Promise<UpdateItemServiceResponseDto> {
    let updateItemServiceResponse = new UpdateItemServiceResponseDto();

    try {
      const updateItemService =
        await this.updateItemServiceUseCase.updateItemService(
          Number(parameters.id),
          body,
        );

      updateItemServiceResponse = updateItemService;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Prisma.PrismaClientKnownRequestError(error.message, error);
      }
    }

    return updateItemServiceResponse;
  }

  @Delete(':id')
  async deleteItemService(
    @Param() parameters: GetItemServiceIdDto,
  ): Promise<DeleteItemServiceResponseDto> {
    let deleteItemServiceResponse = new DeleteItemServiceResponseDto();
    try {
      const deleteItemService =
        await this.deleteItemServiceUseCase.deleteItemService(
          Number(parameters.id),
        );

      deleteItemServiceResponse =
        ItemServiceMapper.deleteItemServiceToController(deleteItemService);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Prisma.PrismaClientKnownRequestError(error.message, error);
      }
    }

    return deleteItemServiceResponse;
  }
}
