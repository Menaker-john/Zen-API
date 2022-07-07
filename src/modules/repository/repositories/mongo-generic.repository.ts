import { Model, Types } from 'mongoose';
import { GenericRepository } from '..';
import * as patchToMongodb from 'jsonpatch-to-mongodb';
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

  findAndHydrate(query: any, children: string[], options: any): Promise<T[]> {
    if (!query) query = {};
    if (!options) options = {};
    return children
      .reduce(
        (cursor, path) => cursor.populate(path),
        this._repository.find(query, { password: 0 }, options),
      )
      .exec();
  }

  findAll(): Promise<T[]> {
    return this._repository.find().exec();
  }

  find(_id: string): Promise<T> {
    const objId = Types.ObjectId.createFromHexString(_id);
    return this._repository.findById(objId).exec();
  }

  applyPatches(_id: string, patches: Record<string, unknown>[]): Promise<T> {
    const update = patchToMongodb(patches);
    const objId = Types.ObjectId.createFromHexString(_id);
    return this._repository
    .findByIdAndUpdate(objId, update, { new: true, fields: { password: 0 } })
    .exec();
  }

  create(item: T): Promise<T> {
    return this._repository.create(item);
  }

  update(_id: string, item: T) {
    return this._repository.findByIdAndUpdate(_id, item);
  }
}
