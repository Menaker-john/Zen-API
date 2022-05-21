import { Types } from "mongoose";

export class UserUpdates {
  _id: Types.ObjectId;
  updates: Record<string, unknown>;
}