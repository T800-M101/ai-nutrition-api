import { UserRole } from "src/auth/enums/user-role.enum";

export interface JwtPayload {
  sub: number;
  email: string;
  role: UserRole;
}
