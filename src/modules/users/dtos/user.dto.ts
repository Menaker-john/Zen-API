import { Types } from 'mongoose';
import { Role } from 'src/modules/roles';

export class User {
  _id: Types.ObjectId;
  username: string;
  password: string;
  roles: Role[];
}
