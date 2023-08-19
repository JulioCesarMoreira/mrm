enum SubCategoryType {
  SUPLIE = 'SUPLIE',
  SERVICE = 'SERVICE',
}

export abstract class CreateCategoryServiceDto {
  abstract name: string;

  abstract subCategory: SubCategoryType;

  abstract tenantId: string;
}

export abstract class GetCategoryServiceIdDto {
  abstract id: number;
}

export abstract class FetchCategoryServicesDto {
  abstract id?: number;

  abstract name?: string;

  abstract subCategory?: SubCategoryType;

  abstract tenantId?: string;
}

export abstract class UpdateCategoryServiceDto {
  abstract subCategory?: SubCategoryType;

  abstract name?: string;
}
