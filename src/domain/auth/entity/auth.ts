export type AuthData = {
  id: string;
  name: string;
  email: string;
};

export type AuthProps = {
  token: string;
};

export class Auth {
  private constructor(private readonly props: AuthProps) {}

  public static create(token: string) {
    return new Auth({ token });
  }

  public get token() {
    return this.props.token;
  }
}
