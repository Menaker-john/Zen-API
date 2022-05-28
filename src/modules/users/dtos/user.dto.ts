import { Types } from 'mongoose';
import { Role } from 'src/modules/roles';

export class User {
  username: string;
  roles: Role[];
  profile: Types.ObjectId;
}
