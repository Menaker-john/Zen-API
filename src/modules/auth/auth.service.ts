import { Injectable, UnauthorizedException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { Types } from 'mongoose';
import { compare } from 'bcrypt';
import { RepositoryService } from '../repository/repository.service';
import { Credentials } from './dtos/credentials.dto';

@Injectable()
export class AuthService {
  constructor(private repository: RepositoryService) {}

  private async comparePasswords(lhs: string, rhs: string): Promise<boolean> {
    return compare(lhs, rhs);
  }

  async signPayload(_id: Types.ObjectId): Promise<string> {
    return sign({ _id }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });
  }

  async validate(payload: any) {
    console.log(payload);
    return this.repository.users.find(payload._id);
  }

  async login(credentials: Credentials) {
    const user = await this.validateCredentials(credentials);
    const token = await this.signPayload(user._id);
    return { _id: user._id, token };
  }

  private async validateCredentials(credentials: Credentials) {
    const user = await this.repository.users.fetchOne({
      username: credentials.username,
    });

    if (!user) throw new UnauthorizedException();

    if (!(await compare(credentials.password, user.password)))
      throw new UnauthorizedException();

    return user;
  }
}
