import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { Role } from 'src/modules/roles';

export class User {
  _id: Types.ObjectId;
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsEnum(Role, { each: true })
  roles: Role[];

  @IsOptional()
  @IsEmail()
  email: string;
  name: Record<string, unknown>;
}
