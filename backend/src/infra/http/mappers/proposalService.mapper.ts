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
        sendDate: proposalServiceEntity.sendDate,
        installmentsBalance: proposalServiceEntity.installmentsBalance,
        periodValidity: proposalServiceEntity.periodValidity,
        discount: proposalServiceEntity.discount,
        percentageEntry: proposalServiceEntity.percentageEntry,
        guaranteePeriod: proposalServiceEntity.guaranteePeriod,
        approved: proposalServiceEntity.approved,
        clientId: proposalServiceEntity.clientId,
        tenantId: proposalServiceEntity.tenantId,
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
