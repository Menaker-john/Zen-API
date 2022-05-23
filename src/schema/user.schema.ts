import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/modules/roles/role.enum';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop() _id: mongoose.Types.ObjectId;
  @Prop({ required: true, unique: true }) username: string;
  @Prop({ required: true }) password: string;
  @Prop(raw({
    first: {type: String},
    middle: {type: String},
    last: {type: String},
  })) name: Record<string, unknown>;

  @Prop() email: string;
  @Prop() roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();

    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
