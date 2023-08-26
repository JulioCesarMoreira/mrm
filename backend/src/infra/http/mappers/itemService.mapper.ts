import {
  CreateItemServiceDto,
  DeleteItemServiceResponseDto,
  FetchItemServicesResponseDto,
  GetItemServiceResponseDto,
  UpdateItemServiceResponseDto,
} from '@infra/http/dtos/itemService';
import { ItemService } from '@application/core/entities';

export class ItemServiceMapper {
  public static createItemServiceToDomain(
    createItemServiceDto: CreateItemServiceDto,
  ): ItemService {
    const itemService = new ItemService();

    itemService.name = createItemServiceDto.name;
    itemService.description = createItemServiceDto.description;
    itemService.unit = createItemServiceDto.unit;
    itemService.status = createItemServiceDto.status;
    itemService.categoryServiceId = createItemServiceDto.categoryServiceId;

    return itemService;
  }

  public static getItemServiceToController(
    itemServiceEntity: ItemService,
  ): GetItemServiceResponseDto {
    let getItemServiceResponseDto = new GetItemServiceResponseDto();

    getItemServiceResponseDto = {
      id: itemServiceEntity.id,
      name: itemServiceEntity.name,
      description: itemServiceEntity.description,
      unit: itemServiceEntity.unit,
      status: itemServiceEntity.status,
      categoryServiceId: itemServiceEntity.categoryServiceId,
    };

    return getItemServiceResponseDto;
  }

  public static fetchItemServiceToController(
    itemServicesEntity: ItemService[],
  ): FetchItemServicesResponseDto {
    const fetchItemServicesResponseDto = new FetchItemServicesResponseDto();
    fetchItemServicesResponseDto.itemServices = [];

    for (const itemServiceEntity of itemServicesEntity) {
      fetchItemServicesResponseDto.itemServices.push({
        id: itemServiceEntity.id,
        name: itemServiceEntity.name,
        description: itemServiceEntity.description,
        unit: itemServiceEntity.unit,
        status: itemServiceEntity.status,
        categoryServiceId: itemServiceEntity.categoryServiceId,
      });
    }

    return fetchItemServicesResponseDto;
  }

  public static updateItemServiceToController(
    updatedItemService: ItemService,
  ): UpdateItemServiceResponseDto {
    const updateItemServiceResponseDto = new UpdateItemServiceResponseDto();

    updateItemServiceResponseDto.name = updatedItemService.name;
    updateItemServiceResponseDto.description = updatedItemService.description;
    updateItemServiceResponseDto.unit = updatedItemService.unit;
    updateItemServiceResponseDto.status = updatedItemService.status;
    updateItemServiceResponseDto.categoryServiceId =
      updatedItemService.categoryServiceId;

    return updateItemServiceResponseDto;
  }

  public static deleteItemServiceToController(
    resultDelete: boolean,
  ): DeleteItemServiceResponseDto {
    const deleteItemServiceResponseDto = new DeleteItemServiceResponseDto();

    deleteItemServiceResponseDto.sucess = resultDelete;

    return deleteItemServiceResponseDto;
  }
}
