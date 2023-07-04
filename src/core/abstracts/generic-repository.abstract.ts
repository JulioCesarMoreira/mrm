export abstract class IGenericRepository<T> {
  abstract fetch(): Promise<T>;

  abstract get(id: string): Promise<T>;

  abstract create(id: string): Promise<T>;

  abstract update(id: string): Promise<T>;
}
