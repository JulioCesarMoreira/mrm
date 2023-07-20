import { Tenant } from '../../entities';

export class CreateTenantResponseDto {
  success: boolean;

  createdTenant?: Tenant;
}
