import * as mongoose from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ContactInfo } from './contact-info.schema';

export type CustomerDocument = Customer & mongoose.Document;

enum Status {
  Prospective = 'Prospective',
  Active = 'Active',
  Deactivated = 'Deactivated',
  Canceled = 'Canceled',
}

@Schema()
export class Customer {
  @Prop()
  _id: mongoose.Types.ObjectId;

  @Prop(
    raw({
      first: { type: String },
      middle: { type: String },
      last: { type: String },
    }),
  )

  @Prop()
  contactInfo: ContactInfo;

  @Prop({type: String, enum: Status})
  status: Status;

  @Prop({type: mongoose.Types.ObjectId, ref: 'Profile'})
  accountOwner: mongoose.Types.ObjectId

}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
