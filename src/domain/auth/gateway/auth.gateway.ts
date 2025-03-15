import { User } from "../../user/entity/user";
import { Auth, AuthData } from "../entity/auth";

export interface AuthGateway {
  createToken(data: AuthData): Promise<Auth>;
  verifyToken(token: string): Promise<AuthData | null>;
  invalidToken(token: string): Promise<void>;
}
