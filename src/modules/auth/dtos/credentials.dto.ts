import { IsNotEmpty, IsString } from 'class-validator';
import * as mongoose from 'mongoose';
import { Role } from 'src/modules/roles';

export class Credentials {
  _id: mongoose.Types.ObjectId;
  
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
  roles: Role[];
  profile: mongoose.Types.ObjectId;
}
