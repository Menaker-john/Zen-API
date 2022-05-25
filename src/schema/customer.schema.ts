import * as mongoose from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CustomerDocument = Customer & mongoose.Document;

@Schema()
export class Customer {}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
