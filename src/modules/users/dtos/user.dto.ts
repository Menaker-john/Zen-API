import { IsEmail, IsEnum, IsNotEmpty, IsNotEmptyObject, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { Role } from 'src/modules/roles';

export class User {
  _id: Types.ObjectId;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(Role, { each: true })
  roles: Role[];

  @IsOptional()
  @IsEmail()
  email: string;

  name: Record<string, string>;
}
