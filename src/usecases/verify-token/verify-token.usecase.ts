import { User } from "../../domain/user/entity/user";
import { UserGateway } from "../../domain/user/gateway/user.gateway";
import { Usecase } from "../usecase";

export type VerifyTokenInputDto = {
  token: string;
};
export type VerifyTokenOutputDto = User | null;

export class VerifyTokenUsecase
  implements Usecase<VerifyTokenInputDto, VerifyTokenOutputDto>
{
  private constructor(private readonly userGateway: UserGateway) {}

  public static create(userGateway: UserGateway) {
    return new VerifyTokenUsecase(userGateway);
  }

  public async execute({
    token,
  }: VerifyTokenInputDto): Promise<VerifyTokenOutputDto> {
    const user = await this.userGateway.verifyToken(token);

    return user;
  }
}
