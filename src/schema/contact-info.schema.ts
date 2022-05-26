import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({_id: false})
class Phones {
  @Prop() fax: string;
  @Prop() cell: string;
  @Prop() office: string;
  @Prop() other: string;
}

const PhonesSchema = SchemaFactory.createForClass(Phones);

@Schema({_id: false})
class Address {
  @Prop() line1: string;
  @Prop() line2: string;
  @Prop() city: string;
  @Prop() state: string;
  @Prop() zipCode: string;
}

const AddressSchema = SchemaFactory.createForClass(Address);

@Schema({_id: false})
class Addresses {
  @Prop({ type: AddressSchema }) billing: Address;
  @Prop({ type: AddressSchema }) shipping: Address;
}

@Schema({_id: false})
export class ContactInfo {
  @Prop({ type: PhonesSchema }) phones: Phones;
  @Prop() email: string;
  @Prop({ type: AddressSchema }) addresses: Addresses;
}

export const ContactInfoSchema = SchemaFactory.createForClass(ContactInfo);
