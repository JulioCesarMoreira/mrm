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
  CreateItemProposalDto,
  CreateItemProposalResponseDto,
  FetchItemProposalsDto,
  FetchItemProposalsResponseDto,
  GetItemProposalIdDto,
  GetItemProposalResponseDto,
  UpdateItemProposalDto,
  UpdateItemProposalResponseDto,
  DeleteItemProposalResponseDto,
} from '@infra/http/dtos/itemProposal';
import { ItemProposalMapper } from '@infra/http/mappers/itemProposal.mapper';
import {
  CreateItemProposalUseCase,
  GetItemProposalUseCase,
  FetchItemProposalUseCase,
  UpdateItemProposalUseCase,
  DeleteItemProposalUseCase,
} from '@application/use-cases/itemProposal';
import { ErrorResponseDto } from '@infra/http/dtos/error/error-response.dto';

@Controller('/itemProposal')
export class ItemProposalController {
  constructor(
    private createItemProposalUseCase: CreateItemProposalUseCase,
    private getItemProposalUsecase: GetItemProposalUseCase,
    private fetchItemProposalsUseCase: FetchItemProposalUseCase,
    private updateItemProposalUseCase: UpdateItemProposalUseCase,
    private deleteItemProposalUseCase: DeleteItemProposalUseCase,
  ) {}

  @Post()
  async createItemProposal(
    @Body() itemProposalDto: CreateItemProposalDto,
  ): Promise<CreateItemProposalResponseDto | ErrorResponseDto> {
    try {
      const createdItemProposal =
        await this.createItemProposalUseCase.createItemProposal(
          itemProposalDto,
        );

      return createdItemProposal;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get(':id')
  async getItemProposal(
    @Param() parameters: GetItemProposalIdDto,
  ): Promise<GetItemProposalResponseDto | ErrorResponseDto> {
    try {
      const itemProposalEntity =
        await this.getItemProposalUsecase.getItemProposal(
          Number(parameters.id),
        );
      return itemProposalEntity;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get()
  async fetchItemProposal(
    @Query() filters: FetchItemProposalsDto,
  ): Promise<FetchItemProposalsResponseDto | ErrorResponseDto> {
    try {
      const { proposalServiceId } = filters;

      if (proposalServiceId) {
        filters.proposalServiceId = Number(proposalServiceId);
      }
      const fetchItemProposalsList =
        await this.fetchItemProposalsUseCase.fetchItemProposal(filters);

      return ItemProposalMapper.fetchItemProposalToController(
        fetchItemProposalsList,
      );
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Patch(':id')
  async updateItemProposal(
    @Param() parameters: GetItemProposalIdDto,
    @Body() body: UpdateItemProposalDto,
  ): Promise<UpdateItemProposalResponseDto | ErrorResponseDto> {
    try {
      const updateItemProposal =
        await this.updateItemProposalUseCase.updateItemProposal(
          Number(parameters.id),
          body,
        );

      return updateItemProposal;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Delete(':id')
  async deleteItemProposal(
    @Param() parameters: GetItemProposalIdDto,
  ): Promise<DeleteItemProposalResponseDto | ErrorResponseDto> {
    try {
      const deleteItemProposal =
        await this.deleteItemProposalUseCase.deleteItemProposal(
          Number(parameters.id),
        );

      return ItemProposalMapper.deleteItemProposalToController(
        deleteItemProposal,
      );
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }
}
