import {
  DeleteItemProposalServiceResponseDto,
  FetchItemProposalServicesResponseDto,
} from '@infra/http/dtos/itemProposalService';
import { ItemProposalService } from '@application/core/entities';

export class ItemProposalServiceMapper {
  public static fetchItemProposalServiceToController(
    itemProposalServicesEntity: ItemProposalService[],
  ): FetchItemProposalServicesResponseDto {
    const fetchItemProposalServicesResponseDto =
      new FetchItemProposalServicesResponseDto();
    fetchItemProposalServicesResponseDto.itemProposalServices = [];

    for (const itemProposalService of itemProposalServicesEntity) {
      fetchItemProposalServicesResponseDto.itemProposalServices.push({
        id: itemProposalService.id,
        unitPrice: itemProposalService.unitPrice,
        quantity: itemProposalService.quantity,
        proposalServiceId: itemProposalService.proposalServiceId,
        itemServiceId: itemProposalService.itemServiceId,
      });
    }

    return fetchItemProposalServicesResponseDto;
  }

  public static deleteItemProposalServiceToController(
    resultDelete: boolean,
  ): DeleteItemProposalServiceResponseDto {
    const deleteItemProposalServiceResponseDto =
      new DeleteItemProposalServiceResponseDto();

    deleteItemProposalServiceResponseDto.sucess = resultDelete;

    return deleteItemProposalServiceResponseDto;
  }
}
