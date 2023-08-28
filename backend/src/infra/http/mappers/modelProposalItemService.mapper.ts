import {
  DeleteModelProposalItemServiceResponseDto,
  FetchModelProposalItemServicesResponseDto,
} from '@infra/http/dtos/modelProposalItemService';
import { ModelProposalItemService } from '@application/core/entities';

export class ModelProposalItemServiceMapper {
  public static fetchModelProposalItemServiceToController(
    modelProposalItemServiceItemServicesEntity: ModelProposalItemService[],
  ): FetchModelProposalItemServicesResponseDto {
    const fetchModelProposalItemServicesResponseDto =
      new FetchModelProposalItemServicesResponseDto();
    fetchModelProposalItemServicesResponseDto.modelProposalItemServices = [];

    for (const modelProposalItemServiceItemService of modelProposalItemServiceItemServicesEntity) {
      fetchModelProposalItemServicesResponseDto.modelProposalItemServices.push({
        id: modelProposalItemServiceItemService.id,
        modelProposalId: modelProposalItemServiceItemService.modelProposalId,
        itemServiceId: modelProposalItemServiceItemService.itemServiceId,
      });
    }

    return fetchModelProposalItemServicesResponseDto;
  }

  public static deleteModelProposalItemServiceToController(
    resultDelete: boolean,
  ): DeleteModelProposalItemServiceResponseDto {
    const deleteModelProposalItemServiceResponseDto =
      new DeleteModelProposalItemServiceResponseDto();

    deleteModelProposalItemServiceResponseDto.sucess = resultDelete;

    return deleteModelProposalItemServiceResponseDto;
  }
}
