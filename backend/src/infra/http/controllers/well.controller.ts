import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateWellDto,
  CreateWellResponseDto,
  FetchWellsDto,
  FetchWellsResponseDto,
  GetWellIdDto,
  GetWellResponseDto,
  UpdateWellDto,
  UpdateWellResponseDto,
  DeleteWellResponseDto,
} from '@infra/http/dtos/well';
import { WellMapper } from '@infra/http/mappers/well.mapper';
import {
  CreateWellUseCase,
  GetWellUseCase,
  FetchWellUseCase,
  UpdateWellUseCase,
  DeleteWellUseCase,
} from '@application/use-cases/well';
import { ErrorResponseDto } from '@infra/http/dtos/error/error-response.dto';

@Controller('/well')
export class WellController {
  constructor(
    private createWellUseCase: CreateWellUseCase,
    private getWellUsecase: GetWellUseCase,
    private fetchWellsUseCase: FetchWellUseCase,
    private updateWellUseCase: UpdateWellUseCase,
    private deleteWellUseCase: DeleteWellUseCase,
  ) {}

  @Post()
  async createWell(
    @Body() wellDto: CreateWellDto,
  ): Promise<CreateWellResponseDto | ErrorResponseDto> {
    try {
      const createdWell = await this.createWellUseCase.createWell(wellDto);

      return createdWell;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get(':id')
  async getWell(
    @Param() parameters: GetWellIdDto,
  ): Promise<GetWellResponseDto | ErrorResponseDto> {
    try {
      const wellEntity = await this.getWellUsecase.getWell(
        Number(parameters.id),
      );
      return wellEntity;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get()
  async fetchWell(
    @Body() filters: FetchWellsDto,
  ): Promise<FetchWellsResponseDto | ErrorResponseDto> {
    try {
      const fetchWellsList = await this.fetchWellsUseCase.fetchWell(filters);

      return WellMapper.fetchWellToController(fetchWellsList);
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Patch(':id')
  async updateWell(
    @Param() parameters: GetWellIdDto,
    @Body() body: UpdateWellDto,
  ): Promise<UpdateWellResponseDto | ErrorResponseDto> {
    try {
      const updateWell = await this.updateWellUseCase.updateWell(
        Number(parameters.id),
        body,
      );

      return updateWell;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Delete(':id')
  async deleteWell(
    @Param() parameters: GetWellIdDto,
  ): Promise<DeleteWellResponseDto | ErrorResponseDto> {
    try {
      const deleteWell = await this.deleteWellUseCase.deleteWell(
        Number(parameters.id),
      );

      return WellMapper.deleteWellToController(deleteWell);
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }
}
