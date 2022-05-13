import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signPayload(_id: string): Promise<string> {
    return sign({ _id }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });
  }

  async validate(payload: any) {
    return await this.userService.findById(payload);
  }
}
