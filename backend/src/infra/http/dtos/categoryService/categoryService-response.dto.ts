export class CreateCategoryServiceResponseDto {
  id: number;

  name: string;

  subCategory: 'SUPLIE' | 'SERVICE';

  tenantId: string;
}

export class GetCategoryServiceResponseDto {
  id: number;

  subCategory: 'SUPLIE' | 'SERVICE';

  name: string;

  tenantId: string;
}

export class FetchCategoryServicesResponseDto {
  categoryServices: {
    id: number;

    subCategory: 'SUPLIE' | 'SERVICE';

    name: string;

    tenantId: string;
  }[];
}

export class DeleteCategoryServiceResponseDto {
  sucess: boolean;
}

export class UpdateCategoryServiceResponseDto {
  id: number;

  name: string;

  subCategory: 'SUPLIE' | 'SERVICE';

  tenantId: string;
}
