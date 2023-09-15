export enum SubCategory {
  SUPLIE = 'SUPLIE',
  SERVICE = 'SERVICE',
}

export enum Status {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
}

export interface CategoryService {
  id: string;
  name: string;
  color: string;
  subCategory: SubCategory;
}

export interface CategoryFields {
  id?: string;
  name: string;
  subCategory: SubCategory;
  color: string;
}
