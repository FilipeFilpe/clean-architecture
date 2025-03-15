import { UserGateway } from "../../domain/user/gateway/user.gateway";
import { Usecase } from "../usecase";

type SignOutInputDto = {
  token: string;
};

type SignOutOutputDto = void;

export class SignOutUsecase
  implements Usecase<SignOutInputDto, SignOutOutputDto>
{
  private constructor(private readonly userGateway: UserGateway) {}

  public static create(userGateway: UserGateway) {
    return new SignOutUsecase(userGateway);
  }
  public async execute({ token }: SignOutInputDto): Promise<void> {
    await this.userGateway.invalidToken(token);
  }
}
