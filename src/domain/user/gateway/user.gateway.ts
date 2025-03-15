import { User } from "../entity/user";

export interface UserGateway {
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
  list(): Promise<Array<User>>;
  findById(id: string): Promise<User | null>;
  find(key: string, value: string): Promise<User | null>;
  delete(id: string): Promise<void>;
  createToken(data: Object): Promise<{ token: string }>;
  verifyToken(token: string): Promise<User | null>;
  invalidToken(token: string): Promise<void>;
}
