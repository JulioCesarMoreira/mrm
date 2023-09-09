import {
  DeleteProposalResponseDto,
  FetchProposalsResponseDto,
} from '@infra/http/dtos/proposal';
import { Proposal } from '@application/core/entities';

export class ProposalMapper {
  public static fetchProposalToController(
    proposalsEntity: Proposal[],
  ): FetchProposalsResponseDto {
    const fetchProposalsResponseDto = new FetchProposalsResponseDto();
    fetchProposalsResponseDto.proposals = [];

    for (const proposalEntity of proposalsEntity) {
      fetchProposalsResponseDto.proposals.push({
        id: proposalEntity.id,
        sendDate: proposalEntity.sendDate,
        installmentsBalance: proposalEntity.installmentsBalance,
        periodValidity: proposalEntity.periodValidity,
        discount: proposalEntity.discount,
        percentageEntry: proposalEntity.percentageEntry,
        guaranteePeriod: proposalEntity.guaranteePeriod,
        approved: proposalEntity.approved,
        clientId: proposalEntity.clientId,
        tenantId: proposalEntity.tenantId,
      });
    }

    return fetchProposalsResponseDto;
  }

  public static deleteProposalToController(
    resultDelete: boolean,
  ): DeleteProposalResponseDto {
    const deleteProposalResponseDto = new DeleteProposalResponseDto();

    deleteProposalResponseDto.sucess = resultDelete;

    return deleteProposalResponseDto;
  }
}
