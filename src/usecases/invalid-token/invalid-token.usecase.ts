import { UserGateway } from "../../domain/user/gateway/user.gateway";
import { Usecase } from "../usecase";

type InvalidTokenInputDto = {
  token: string;
};

type InvalidTokenOutputDto = void;

export class InvalidTokenUsecase
  implements Usecase<InvalidTokenInputDto, InvalidTokenOutputDto>
{
  private constructor(private readonly userGateway: UserGateway) {}

  public static create(userGateway: UserGateway) {
    return new InvalidTokenUsecase(userGateway);
  }

  public async execute({ token }: InvalidTokenInputDto): Promise<void> {
    await this.userGateway.verifyToken(token);
  }
}
