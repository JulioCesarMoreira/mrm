export abstract class IGenericRepository<T> {
  abstract fetch(): Promise<T>;

  abstract get(id: string): Promise<T>;

  abstract create(entity: T): Promise<T>;

  abstract update(id: string): Promise<T>;
}
