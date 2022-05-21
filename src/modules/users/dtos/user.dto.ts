import { Types } from 'mongoose';
import { Role } from 'src/modules/roles';
import { UserProfile } from 'src/schema/user-profile.schema';

export class User {
  _id: Types.ObjectId;
  username: string;
  password: string;
  roles: Role[];
  profile: UserProfile;
}
