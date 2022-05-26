import { Role } from 'src/modules/roles';
import { ContactInfo } from 'src/schema/contact-info.schema';

export class User {
  username: string;
  roles: Role[];
  name: Record<string, string>;
  contactInfo: ContactInfo;
}
