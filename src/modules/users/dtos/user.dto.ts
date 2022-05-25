import {
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { Types } from 'mongoose';
import { Role } from 'src/modules/roles';
import { ContactInfo } from 'src/schema/contact-info.schema';

export class User {
  _id: Types.ObjectId;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(Role, { each: true })
  roles: Role[];

  name: Record<string, string>;

  contactInfo: ContactInfo;
}
