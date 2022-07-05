class Phones {
  fax: string;
  cell: string;
  office: string;
  other: string;
}

class Address {
  line1: string;
  line2: string;
  city: string;
  state: string;
  zipCode: string;
}

class Addresses {
  billing: Address;
  shipping: Address;
}

export class ContactInfo {
  phones: Phones;
  email: string;
  addresses: Addresses
}