import { Body, Controller, Post } from '@nestjs/common';
import {
  CreateTenantResponseDto,
  CreateTenantDto,
} from '@application/core/dtos/tenant';
import { CreateTenantUseCase } from '@application/use-cases/tenant';

@Controller('/tenant')
export class TenantController {
  constructor(private createTenantUseCase: CreateTenantUseCase) {}

  @Post()
  async createTenant(
    @Body() tenantDto: CreateTenantDto,
  ): Promise<CreateTenantResponseDto> {
    const createTenantResponse = new CreateTenantResponseDto();

    try {
      const createdTenant = await this.createTenantUseCase.createTenant(
        tenantDto,
      );

      createTenantResponse.success = true;
      createTenantResponse.createdTenant = createdTenant;
    } catch (error) {
      console.log(error);

      createTenantResponse.success = false;
    }

    return createTenantResponse;
  }
}
