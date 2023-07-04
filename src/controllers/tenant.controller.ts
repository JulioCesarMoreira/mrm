import { Body, Controller, Post } from '@nestjs/common';
import { CreateTenantDto } from 'src/core/dtos/tenant';
import { CreateTenantResponseDto } from 'src/core/dtos/tenant';
import { TenantUseCases } from 'src/use-cases/tenant';

@Controller('/tenant')
export class TenantController {
  constructor(private tenantUseCases: TenantUseCases) {}

  @Post()
  async createTenant(
    @Body() tenantDto: CreateTenantDto,
  ): Promise<CreateTenantResponseDto> {
    const createTenantResponse = new CreateTenantResponseDto();

    try {
      const createdTenant = await this.tenantUseCases.createTenant(tenantDto);

      createTenantResponse.success = true;
      createTenantResponse.createdTenant = createdTenant;
    } catch (error) {
      console.log(error);

      createTenantResponse.success = false;
    }

    return createTenantResponse;
  }
}
