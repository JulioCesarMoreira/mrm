export class CategoryService {
  id: number;
  name: string;
  subCategory: SubCategory;
  tenantId: string;
}

export enum SubCategory {
  SUPLIE,
  SERVICE,
}
