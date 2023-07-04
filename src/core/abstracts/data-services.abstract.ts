import { Tenant, User } from '../entities';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServices {
  abstract tenant: IGenericRepository<Tenant>;

  abstract user: IGenericRepository<User>;
}
