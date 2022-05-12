import { Role } from "src/modules/roles/role.enum";

export class UserDTO {
  _id: string;
  username: string;
  roles: Role[]
}