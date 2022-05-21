import { Model } from 'mongoose';
import { GenericRepository } from './generic.repository';

export class MongoGenericRepository<T> implements GenericRepository<T> {
  constructor(private _repository: Model<T>) {}

  fetch(
    query: Record<string, unknown>,
    projection: Record<string, unknown> = {},
  ): Promise<T[]> {
    return this._repository.find(query, projection).exec();
  }

  fetchOne(
    query: Record<string, unknown>,
    projection: Record<string, unknown> = {},
  ): Promise<T> {
    return this._repository.findOne(query, projection).exec();
  }

  findAll(): Promise<T[]> {
    return this._repository.find().exec();
  }

  find(_id: string): Promise<T> {
    return this._repository.findById(_id).exec();
  }

  create(item: T): Promise<T> {
    try {
      return this._repository.create(item);
    } catch (error) {
      throw error;
    }
  }

  update(_id: string, item: T) {
    return this._repository.findByIdAndUpdate(_id, item);
  }
}
