import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateProposalDto,
  CreateProposalResponseDto,
  FetchProposalsDto,
  FetchProposalsResponseDto,
  GetProposalIdDto,
  GetProposalResponseDto,
  UpdateProposalDto,
  UpdateProposalResponseDto,
  DeleteProposalResponseDto,
  FetchItemServicesToProposalResponseDto,
  SaveProposalIdAttachmentDto,
  SaveProposalAttachmentResponseDto,
  DeleteProposalAttachmentDto,
  DeleteProposalAttachmentResponseDto,
} from '@infra/http/dtos/proposal';
import { ProposalMapper } from '@infra/http/mappers/proposal.mapper';
import {
  CreateProposalUseCase,
  GetProposalUseCase,
  FetchProposalUseCase,
  UpdateProposalUseCase,
  DeleteProposalUseCase,
} from '@application/use-cases/proposal';
import { ErrorResponseDto } from '@infra/http/dtos/error/error-response.dto';
import { FetchItemServiceToProposalUseCase } from '@application/use-cases/itemService/fetchToProposal-itemService.use-case';
import { ItemServiceMapper } from '../mappers/itemService.mapper';
import {
  RequestTenantDataInterface,
  RequestTentantData,
} from 'src/infra/guard/tenantData.decorator';
import { SaveProposalAttachmentUseCase } from '@application/use-cases/attachments';
import { HandleFile } from './decorators/handleFile';
import { Attachment } from '@application/core/entities';
import { DeleteProposalAttachmentUseCase } from '@application/use-cases/attachments/deleteProposalAttatchment.use-case';

@Controller('/proposal')
export class ProposalController {
  constructor(
    private createProposalUseCase: CreateProposalUseCase,
    private getProposalUsecase: GetProposalUseCase,
    private fetchProposalsUseCase: FetchProposalUseCase,
    private updateProposalUseCase: UpdateProposalUseCase,
    private deleteProposalUseCase: DeleteProposalUseCase,
    private itemsServiceFetchUseCase: FetchItemServiceToProposalUseCase,
    private saveProposalAttachmentUseCase: SaveProposalAttachmentUseCase,
    private deleteProposalAttachmentUseCase: DeleteProposalAttachmentUseCase,
  ) {}

  @Post()
  async createProposal(
    @Body() proposalDto: CreateProposalDto,
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<CreateProposalResponseDto | ErrorResponseDto> {
    try {
      const tenantId = tenantData.id;
      const createdProposal = await this.createProposalUseCase.createProposal({
        ...proposalDto,
        tenantId,
      });

      return createdProposal;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get('get/:id')
  async getProposal(
    @Param() parameters: GetProposalIdDto,
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<GetProposalResponseDto | ErrorResponseDto> {
    try {
      const tenantId = tenantData.id;
      const proposalEntity = await this.getProposalUsecase.getProposal(
        Number(parameters.id),
        tenantId,
      );
      return proposalEntity;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get()
  async fetchProposal(
    @Query() filters: FetchProposalsDto,
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<FetchProposalsResponseDto | ErrorResponseDto> {
    try {
      const tenantId = tenantData.id;
      const fetchProposalsList = await this.fetchProposalsUseCase.fetchProposal(
        filters,
        tenantId,
      );

      return ProposalMapper.fetchProposalToController(fetchProposalsList);
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Patch(':id')
  async updateProposal(
    @Param() parameters: GetProposalIdDto,
    @Body() body: UpdateProposalDto,
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<UpdateProposalResponseDto | ErrorResponseDto> {
    try {
      const tenantId = tenantData.id;
      const updateProposal = await this.updateProposalUseCase.updateProposal(
        Number(parameters.id),
        body,
        tenantId,
      );

      return updateProposal;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Delete(':id')
  async deleteProposal(
    @Param() parameters: GetProposalIdDto,
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<DeleteProposalResponseDto | ErrorResponseDto> {
    try {
      const tenantId = tenantData.id;
      const deleteProposal = await this.deleteProposalUseCase.deleteProposal(
        Number(parameters.id),
        tenantId,
      );

      return ProposalMapper.deleteProposalToController(deleteProposal);
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get('item-service/')
  async getItemServiceToProposal(): Promise<
    FetchItemServicesToProposalResponseDto | ErrorResponseDto
  > {
    try {
      const fetchItemsServices =
        await this.itemsServiceFetchUseCase.fetchItemService();

      return ItemServiceMapper.fetchItemServiceToController(fetchItemsServices);
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Post(':id/attachment')
  async SaveProposalAttchament(
    @Param() parameters: SaveProposalIdAttachmentDto,
    @RequestTentantData() tenantData: RequestTenantDataInterface,
    @HandleFile() attachment: Attachment,
  ): Promise<SaveProposalAttachmentResponseDto | ErrorResponseDto> {
    try {
      const { id } = parameters;

      const tenantId = tenantData.id;
      const attachmentUrl = await this.saveProposalAttachmentUseCase.save(
        Number(id),
        tenantId,
        attachment.filename,
        attachment.mimetype,
        attachment.buffer,
      );
      let messageResponse: string;
      if (attachmentUrl) {
        messageResponse = `File ${attachment.filename} attachement saved.`;
      } else {
        messageResponse = `File ${attachment.filename} attachement not saved.`;
      }
      return {
        url: attachmentUrl,
        message: messageResponse,
      };
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Delete(':id/attachment/:fileName')
  async DeleteProposalAttachment(
    @Param() parameters: DeleteProposalAttachmentDto,
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<DeleteProposalAttachmentResponseDto | ErrorResponseDto> {
    try {
      const response: DeleteProposalAttachmentResponseDto = { message: '' };
      const tenantId = tenantData.id;

      const { id, fileName } = parameters;

      const deleteResponse = await this.deleteProposalAttachmentUseCase.delete(
        Number(id),
        tenantId,
        fileName,
      );
      console.log('deleteResponse', deleteResponse);

      response.message = deleteResponse;

      return response;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }
}
