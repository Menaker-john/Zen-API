export abstract class GenericRepository<T> {
  abstract findAll(): Promise<T[]>;
  abstract find(_id: string): Promise<T>;
  abstract fetch(query: {}, projection?: {}): Promise<T[]>;
  abstract fetchOne(query: {}, projection?: {}): Promise<T>;
  abstract create(item: T): Promise<T>;
  abstract update(_id: string, item: T): void;
}