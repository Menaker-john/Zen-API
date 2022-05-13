import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/modules/roles/role.enum';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true }) username: string;
  @Prop({ required: true }) password: string;
  @Prop() roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});