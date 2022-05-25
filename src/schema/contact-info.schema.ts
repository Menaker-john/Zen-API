import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class Phones {
  @Prop() fax: string;
  @Prop() cell: string;
  @Prop() office: string;
  @Prop() other: string;
}

const PhonesSchema = SchemaFactory.createForClass(Phones);

@Schema()
class Address {
  @Prop() line1: string;
  @Prop() line2: string;
  @Prop() city: string;
  @Prop() state: string;
  @Prop() zipCode: string;
}

const AddressSchema = SchemaFactory.createForClass(Address);

@Schema()
class Addresses {
  @Prop({ type: AddressSchema }) billing: Address;
  @Prop({ type: AddressSchema }) shipping: Address;
}

@Schema()
export class ContactInfo {
  @Prop({ type: PhonesSchema }) phones: Phones;
  @Prop() email: string;
  @Prop({ type: AddressSchema }) addresses: Addresses;
}

export const ContactInfoSchema = SchemaFactory.createForClass(ContactInfo);
