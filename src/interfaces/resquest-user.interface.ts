import { UserRole } from "src/auth/enums/user-role.enum";

export interface RequestWithUser extends Request {
  user: {
    email: string;
    role: UserRole;
  };
}