import {
  DeleteModelProposalResponseDto,
  FetchModelProposalsResponseDto,
} from '@infra/http/dtos/modelProposal';
import { ModelProposal } from '@application/core/entities';

export class ModelProposalMapper {
  public static fetchModelProposalToController(
    modelProposalsEntity: ModelProposal[],
  ): FetchModelProposalsResponseDto {
    const fetchModelProposalsResponseDto = new FetchModelProposalsResponseDto();
    fetchModelProposalsResponseDto.modelProposals = [];

    for (const modelProposal of modelProposalsEntity) {
      fetchModelProposalsResponseDto.modelProposals.push({
        id: modelProposal.id,
        name: modelProposal.name,
        tenantId: modelProposal.tenantId,
      });
    }

    return fetchModelProposalsResponseDto;
  }

  public static deleteModelProposalToController(
    resultDelete: boolean,
  ): DeleteModelProposalResponseDto {
    const deleteModelProposalResponseDto = new DeleteModelProposalResponseDto();

    deleteModelProposalResponseDto.sucess = resultDelete;

    return deleteModelProposalResponseDto;
  }
}
