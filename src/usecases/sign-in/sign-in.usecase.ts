import { User } from "../../domain/user/entity/user";
import { UserGateway } from "../../domain/user/gateway/user.gateway";
import { Usecase } from "../usecase";

export type SignInInputDto = {
  email: string;
  password: string;
};

export type SignInOutputDto = null | {
  id: string;
  name: string;
  email: string;
};

export class SignInUsecase implements Usecase<SignInInputDto, SignInOutputDto> {
  private constructor(private readonly userGateway: UserGateway) {}

  public static create(userGateway: UserGateway) {
    return new SignInUsecase(userGateway);
  }

  public async execute(input: SignInInputDto): Promise<SignInOutputDto> {
    const aUser = await this.userGateway.find("email", input.email);
    const user = aUser
      ? User.with({
          id: aUser.id,
          name: aUser.name,
          email: aUser.email,
          password: aUser.password,
        })
      : null;

    const validPassword = await User.verify(
      input.password,
      user?.password || ""
    );

    if (validPassword && user) {
      // const { token } = await this.userGateway.createToken({
      //   id: user.id,
      //   name: user.name,
      //   email: user.email,
      // });

      // return {
      //   token,
      // };

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }

    return null;
  }
}
