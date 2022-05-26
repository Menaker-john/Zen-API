import * as mongoose from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ContactInfo } from './contact-info.schema';

export type ProfileDocument = Profile & mongoose.Document;

@Schema()
export class Profile {
  @Prop(
    raw({
      first: { type: String },
      middle: { type: String },
      last: { type: String },
    }),
  )
  name: Record<string, string>;

  @Prop()
  contactInfo: ContactInfo;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
