export class ItemService {
  id: number;

  name: string;

  description: string;

  unit: string;

  status: 'AVAILABLE' | 'UNAVAILABLE';

  categoryServiceId: number;
}
