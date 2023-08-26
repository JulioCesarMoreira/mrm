export class CreateItemServiceResponseDto {
  id: number;

  name: string;

  description: string;

  unit: string;

  status: 'AVAILABLE' | 'UNAVAILABLE';

  categoryServiceId: number;
}

export class GetItemServiceResponseDto {
  id: number;

  name: string;

  description: string;

  unit: string;

  status: 'AVAILABLE' | 'UNAVAILABLE';

  categoryServiceId: number;
}

export class FetchItemServicesResponseDto {
  itemServices: {
    id: number;

    name: string;

    description: string;

    unit: string;

    status: 'AVAILABLE' | 'UNAVAILABLE';

    categoryServiceId: number;
  }[];
}

export class DeleteItemServiceResponseDto {
  sucess: boolean;
}

export class UpdateItemServiceResponseDto {
  id: number;

  name: string;

  description: string;

  unit: string;

  status: 'AVAILABLE' | 'UNAVAILABLE';

  categoryServiceId: number;
}
