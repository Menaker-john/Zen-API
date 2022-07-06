import { Types } from "mongoose";
import { ContactInfo, CustomerStatus } from "src/common";

export class Customer {
  _id: Types.ObjectId;
  name: Record<string, string>;
  contactInfo: ContactInfo;
  status: CustomerStatus
  accountOwner: Types.ObjectId;
  owner: Types.ObjectId;
}