import crypto from "crypto";

export type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export class User {
  private constructor(private readonly props: UserProps) {}

  public static async create(name: string, email: string, password: string) {
    return new User({
      id: crypto.randomUUID().toString(),
      name,
      email,
      password: await this.hash(password),
    });
  }

  public static with(props: UserProps) {
    return new User(props);
  }

  public get id() {
    return this.props.id;
  }
  public get name() {
    return this.props.name;
  }
  public get email() {
    return this.props.email;
  }
  public get password() {
    return this.props.password;
  }

  private static async hash(password: string) {
    // Generate a random 16-byte salt
    const salt = crypto.randomBytes(16).toString("hex");

    // Hash the password with the salt
    const derivedKey = await new Promise((resolve, reject) => {
      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey);
      });
    });

    // Return the salt and the derived key
    return `${salt}:${(
      derivedKey as unknown as Buffer<ArrayBufferLike>
    ).toString("hex")}`;
  }

  // public async verify(password: string, hash: string) {
  public static async verify(password: string, passwordHash: string) {
    const [salt, storedHash] = passwordHash.split(":");
    const derivedKey = await new Promise((resolve, reject) => {
      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey);
      });
    });

    // Compare the derived key with the stored hash
    return crypto.timingSafeEqual(
      Buffer.from(storedHash, "hex"),
      derivedKey as Buffer<ArrayBufferLike>
    );
  }
}
