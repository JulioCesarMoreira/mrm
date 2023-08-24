export class ItemService {
  id: number;

  name: string;

  unit: string;

  description: string;

  status: 'AVAILABLE' | 'UNAVAILABLE';

  categoryServiceId: number;
}
