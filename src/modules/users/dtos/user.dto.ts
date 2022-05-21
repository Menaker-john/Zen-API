import { Types } from 'mongoose';
import { Role } from 'src/modules/roles/role.enum';

export class User {
  _id: Types.ObjectId;
  username: string;
  password: string;
  roles: Role[];
}
