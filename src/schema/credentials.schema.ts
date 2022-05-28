import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/modules/roles';

export type CredentialsDocument = Credentials & mongoose.Document;

@Schema()
export class Credentials {
  @Prop()
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Profile' })
  profile: mongoose.Types.ObjectId;

  @Prop({ type: [String], enum: Role })
  roles: Role[];
}

export const CredentialsSchema = SchemaFactory.createForClass(Credentials);

CredentialsSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();

    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
