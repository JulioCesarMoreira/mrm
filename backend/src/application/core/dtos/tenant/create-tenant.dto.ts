import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTenantDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsUUID()
  @IsNotEmpty()
  cognitoId: string;
}
