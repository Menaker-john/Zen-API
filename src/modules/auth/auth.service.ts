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

  async create(credentials: Credentials) {
    try {
      await this.repository.credentials.create(credentials);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async validate(payload: any) {
    try {
      const doc = await this.repository.credentials.find(payload._id);
      doc._id = payload._id;
      return doc;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async userAlreadyExists(username: string) {
    try {
      return (await this.fetchUserByUsername(username)) != undefined;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async login(credentials: Credentials) {
    const user = await this.validateCredentials(credentials);
    const token = await this.signPayload(user._id);
    return { _id: user._id, token };
  }

  private async validateCredentials(credentials: Credentials) {
    const user = await this.fetchUserByUsername(credentials.username);
    if (!user) throw new UnauthorizedException();
    await this.comparePasswords(credentials.password, user.password);
    return user;
  }

  private async signPayload(_id: Types.ObjectId): Promise<string> {
    return sign({ _id }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });
  }

  private async fetchUserByUsername(username: string): Promise<Credentials> {
    try {
      return this.repository.credentials.fetchOne({ username });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  private async comparePasswords(credentials: string, user: string) {
    if (!(await compare(credentials, user))) throw new UnauthorizedException();
  }
}
