import { Types } from 'mongoose';

export class Authorization {
  _id: Types.ObjectId;
  token: string;
}
