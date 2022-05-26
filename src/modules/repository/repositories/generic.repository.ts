export abstract class GenericRepository<T> {
  abstract findAll(): Promise<T[]>;
  abstract findAndHydrate(children: string[]): Promise<T[]>;
  abstract find(_id: string): Promise<T>;
  abstract fetch(
    query: Record<string, unknown>,
    projection?: Record<string, unknown>,
  ): Promise<T[]>;
  abstract fetchOne(
    query: Record<string, unknown>,
    projection?: Record<string, unknown>,
  ): Promise<T>;
  abstract create(item: T): Promise<T>;
  abstract update(_id: string, item: T): void;
}
