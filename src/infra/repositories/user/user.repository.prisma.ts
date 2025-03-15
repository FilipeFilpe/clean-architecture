import { PrismaClient } from "@prisma/client";
import { User } from "../../../domain/user/entity/user";
import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { SignJWT, jwtVerify } from "jose";

const blackList = new Set();

export class UserRepositoryPrisma implements UserGateway {
  private readonly secret = new TextEncoder().encode(process.env.SECRET_KEY);

  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new UserRepositoryPrisma(prismaClient);
  }

  public async save(user: User): Promise<void> {
    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };

    await this.prismaClient.user.create({
      data,
    });
  }

  public async update(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async list(): Promise<Array<User>> {
    const data = await this.prismaClient.user.findMany();

    const users = data.map((user) => {
      return User.with({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      });
    });
    return users;
  }

  public async findById(id: string): Promise<User | null> {
    const data = await this.prismaClient.user.findFirst({
      where: { id },
    });

    const user = data
      ? User.with({
          id: data?.id,
          name: data?.name,
          email: data?.email,
          password: data?.password,
        })
      : null;

    return user;
  }

  public async find(key: string, value: string): Promise<User | null> {
    const data = await this.prismaClient.user.findFirst({
      where: { [key]: value },
    });

    const user = data
      ? User.with({
          id: data?.id,
          name: data?.name,
          email: data?.email,
          password: data?.password,
        })
      : null;

    return user;
  }

  public async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async createToken(data: Object): Promise<{ token: string }> {
    const alg = "HS256";

    const jwt = await new SignJWT({ ...data })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      // .setIssuer("urn:example:issuer")
      // .setAudience("urn:example:audience")
      .setExpirationTime("2h")
      .sign(this.secret);

    return {
      token: jwt,
    };
  }

  public async verifyToken(token: string): Promise<User | null> {
    if (blackList.has(token)) {
      throw new Error("Invalid token");
    }

    const { payload } = await jwtVerify(token, this.secret);

    if (payload) {
      const user = await this.findById(payload.id as unknown as string);
      return user;
    }

    return null;
  }

  public async invalidToken(token: string): Promise<void> {
    blackList.add(token);
  }
}
