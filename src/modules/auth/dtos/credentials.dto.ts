import * as mongoose from 'mongoose';
import { Role } from 'src/modules/roles';

export class Credentials {
  _id: mongoose.Types.ObjectId;
  username: string;
  password: string;
  roles: Role[];
  profile: mongoose.Types.ObjectId;
}
