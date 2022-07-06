import * as mongoose from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ContactInfo } from './contact-info.schema';
import { CustomerStatus } from 'src/common';
import { Ownable } from './ownable.schema';

export type CustomerDocument = Customer & mongoose.Document;

@Schema()
export class Customer extends Ownable {
  @Prop()
  _id: mongoose.Types.ObjectId;

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

  @Prop({type: String, enum: CustomerStatus})
  status: CustomerStatus;

  @Prop({type: mongoose.Types.ObjectId, ref: 'Profile'})
  accountOwner: mongoose.Types.ObjectId

}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
