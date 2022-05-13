import { Role } from "src/modules/roles/role.enum";

export class User {
  _id: string;
  username: string;
  password: string;
  roles: Role[]
}