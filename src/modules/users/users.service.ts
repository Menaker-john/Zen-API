import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/schema/user.schema';
import { UserDTO } from './dtos/user.dto';
import { AuthUserDTO } from './dtos/auth-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userPayload: UserDTO): Promise<string> {
    const { username } = userPayload;
    const user = await this.userModel.findOne({ username });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const createdUser = new this.userModel(userPayload);
    await createdUser.save();
    return createdUser._id;
  }

  async validateCredentials(userPayload: AuthUserDTO): Promise<string> {
    const { username, password } = userPayload;
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return user._id;
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }
  }

  async findById(payload: any): Promise<UserDTO> {
    const { _id } = payload;
    const user = await this.userModel.findOne({ _id }, { password: 0 });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async findAll(): Promise<UserDTO[]> {
    return await this.userModel.find({}, { password: 0 }).exec();
  }
}
