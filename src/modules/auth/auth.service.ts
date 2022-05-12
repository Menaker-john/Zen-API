import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { ObjectId } from 'mongoose';
import { UserDTO } from '../users/dtos/user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signPayload(_id: string): Promise<string> {
    return sign({ _id }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });
  }

  async validate(payload: any): Promise<UserDTO> {
    return await this.userService.findById(payload);
  }
}
