export enum SubCategory {
  SUPLIE = 'SUPLIE',
  SERVICE = 'SERVICE',
}

export enum Status {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
}

export interface CategoryService {
  id: string;
  name: string;
  color: string;
  subCategory: SubCategory;
}

export interface ItemService {
  id: string;
  name: string;
  description: string;
  unit: string;
  status: Status;
  categoryServiceId: string;
}

export interface CategoryFields {
  id?: string;
  name: string;
  subCategory: SubCategory;
  color: string;
}

export interface ItemServiceFields {
  id?: string;
  name: string;
  description: string;
  unit: string;
  status: Status;
  categoryServiceId: string;
}
