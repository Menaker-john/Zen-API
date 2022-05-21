import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserProfileDocument = UserProfile & mongoose.Document;

@Schema()
export class UserProfile {
  @Prop() _id: mongoose.Types.ObjectId;
  @Prop({ required: true }) firstName: string;
  @Prop({ required: true }) lastName: string;
  @Prop({ required: true }) email: string;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
