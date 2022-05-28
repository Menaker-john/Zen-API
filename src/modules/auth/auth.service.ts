import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { Types } from 'mongoose';
import { compare } from 'bcrypt';
import { RepositoryService } from '../repository';
import { Credentials } from './dtos/credentials.dto';

@Injectable()
export class AuthService {
  constructor(private repository: RepositoryService) {}

  async signPayload(_id: Types.ObjectId): Promise<string> {
    return sign({ _id }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });
  }

  async validate(payload: any) {
    return this.repository.credentials.find(payload._id);
  }

  async login(credentials: Credentials) {
    const user = await this.validateCredentials(credentials);
    const token = await this.signPayload(user._id);
    return { _id: user._id, token };
  }

  async create(credentials: Credentials) {
    try {
      await this.repository.credentials.create(credentials);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async fetchByUsername(username: string): Promise<Credentials> {
    try {
      return this.repository.credentials.fetchOne({ username });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async userAlreadyExists(username: string) {
    try {
      return (await this.fetchByUsername(username)) != undefined;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  private async validateCredentials(credentials: Credentials) {
    const user = await this.repository.credentials.fetchOne({
      username: credentials.username,
    });

    if (!user) throw new UnauthorizedException();

    if (!(await compare(credentials.password, user.password)))
      throw new UnauthorizedException();

    return user;
  }
}
