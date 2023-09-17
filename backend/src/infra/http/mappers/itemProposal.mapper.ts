import {
  DeleteItemProposalResponseDto,
  FetchItemProposalsResponseDto,
} from '@infra/http/dtos/itemProposal';
import { ItemProposal } from '@application/core/entities';

export class ItemProposalMapper {
  public static fetchItemProposalToController(
    itemProposalsEntity: ItemProposal[],
  ): FetchItemProposalsResponseDto {
    const fetchItemProposalsResponseDto = new FetchItemProposalsResponseDto();
    fetchItemProposalsResponseDto.itemProposals = [];

    for (const itemProposal of itemProposalsEntity) {
      fetchItemProposalsResponseDto.itemProposals.push({
        id: itemProposal.id,
        unitPrice: itemProposal.unitPrice,
        quantity: itemProposal.quantity,
        proposalServiceId: itemProposal.proposalServiceId,
        itemServiceId: itemProposal.itemServiceId,
      });
    }

    return fetchItemProposalsResponseDto;
  }

  public static deleteItemProposalToController(
    resultDelete: boolean,
  ): DeleteItemProposalResponseDto {
    const deleteItemProposalResponseDto = new DeleteItemProposalResponseDto();

    deleteItemProposalResponseDto.sucess = resultDelete;

    return deleteItemProposalResponseDto;
  }
}
