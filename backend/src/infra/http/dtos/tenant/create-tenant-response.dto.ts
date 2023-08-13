import { Tenant } from '@application/core/entities';

export class CreateTenantResponseDto {
  success: boolean;

  createdTenant?: Tenant;
}
