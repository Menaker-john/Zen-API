import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './dtos/user.dto';
import { UserCredentials } from './dtos/user-credentials.dto';
import { RepositoryService } from '../repository/repository.service';

@Injectable()
export class UsersService {
  constructor(
    private repository: RepositoryService
  ) {}


  private async comparePasswords(lhs: string, rhs: string): Promise<boolean> {
    return await bcrypt.compare(lhs, rhs);
  }

  private async throwIfNotSamePassword(lhs: string, rhs: string){
    if (!(await this.comparePasswords(lhs, rhs)))
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
  }

  private throwIfUserExists(user: User): void {
    if (user)
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
  }

  private throwIfUserMissing(user: User): void {
    if(!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }

  private async throwIfAlreadyExists(userPayload: User) {
    const user = await this.fetchUserByUsername(userPayload.username);
    this.throwIfUserExists(user);
  }

  private async fetchUserThrowIfMissing(userPayload: User): Promise<User>{
    const user = await this.repository.users.fetchOne({username: userPayload.username}) as User;
    this.throwIfUserMissing(user);
    return user;
  }

  async create(userPayload: User) {
    this.throwIfAlreadyExists(userPayload);
    return await this.repository.users.create(userPayload) as User;
  }

  async validateCredentials(credentials: UserCredentials) {
    const user = await this.fetchUserThrowIfMissing(credentials as User);
    await this.throwIfNotSamePassword(credentials.password, user.password);
    return user
  }

  async fetchUserByUsername(username: string): Promise<User> {
    return await this.repository.users.fetchOne({ username }) as User;
  }

  async findById(payload: any): Promise<User> {
    const user = await this.repository.users.find(payload._id) as User;
    this.throwIfUserMissing(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.repository.users.fetch({}, { password: 0 }) as User[];
  }
}
