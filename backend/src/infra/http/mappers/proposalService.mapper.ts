import {
  DeleteProposalServiceResponseDto,
  FetchProposalServicesResponseDto,
} from '@infra/http/dtos/proposalService';
import { ProposalService } from '@application/core/entities';

export class ProposalServiceMapper {
  public static fetchProposalServiceToController(
    proposalServicesEntity: ProposalService[],
  ): FetchProposalServicesResponseDto {
    const fetchProposalServicesResponseDto =
      new FetchProposalServicesResponseDto();
    fetchProposalServicesResponseDto.proposalServices = [];

    for (const proposalServiceEntity of proposalServicesEntity) {
      fetchProposalServicesResponseDto.proposalServices.push({
        id: proposalServiceEntity.id,
        order: proposalServiceEntity.order,
        side: proposalServiceEntity.side,
        categoryServiceId: proposalServiceEntity.categoryServiceId,
        proposalId: proposalServiceEntity.proposalId,
      });
    }

    return fetchProposalServicesResponseDto;
  }

  public static deleteProposalServiceToController(
    resultDelete: boolean,
  ): DeleteProposalServiceResponseDto {
    const deleteProposalServiceResponseDto =
      new DeleteProposalServiceResponseDto();

    deleteProposalServiceResponseDto.sucess = resultDelete;

    return deleteProposalServiceResponseDto;
  }
}
