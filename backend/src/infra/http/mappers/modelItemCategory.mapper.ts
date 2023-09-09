import {
  DeleteModelItemCategoryResponseDto,
  FetchModelItemCategorysResponseDto,
} from '@infra/http/dtos/modelItemCategory';
import { ModelItemCategory } from '@application/core/entities';

export class ModelItemCategoryMapper {
  public static fetchModelItemCategoryToController(
    ModelItemCategoryItemServicesEntity: ModelItemCategory[],
  ): FetchModelItemCategorysResponseDto {
    const fetchModelItemCategorysResponseDto =
      new FetchModelItemCategorysResponseDto();
    fetchModelItemCategorysResponseDto.ModelItemCategorys = [];

    for (const ModelItemCategoryItemService of ModelItemCategoryItemServicesEntity) {
      fetchModelItemCategorysResponseDto.ModelItemCategorys.push({
        id: ModelItemCategoryItemService.id,
        modelProposalId: ModelItemCategoryItemService.modelProposalId,
        itemServiceId: ModelItemCategoryItemService.itemServiceId,
      });
    }

    return fetchModelItemCategorysResponseDto;
  }

  public static deleteModelItemCategoryToController(
    resultDelete: boolean,
  ): DeleteModelItemCategoryResponseDto {
    const deleteModelItemCategoryResponseDto =
      new DeleteModelItemCategoryResponseDto();

    deleteModelItemCategoryResponseDto.sucess = resultDelete;

    return deleteModelItemCategoryResponseDto;
  }
}
