import { UserGateway } from "../../domain/user/gateway/user.gateway";
import { Usecase } from "../usecase";

export type CreateTokenInputDto = {
  data: Object;
};

export type CreateTokenOutputDto = {
  token: string;
};

export class CreateTokenUsecase
  implements Usecase<CreateTokenInputDto, CreateTokenOutputDto>
{
  private constructor(private readonly userGateway: UserGateway) {}

  public static create(userGateway: UserGateway) {
    return new CreateTokenUsecase(userGateway);
  }

  public async execute({
    data,
  }: CreateTokenInputDto): Promise<CreateTokenOutputDto> {
    const token = await this.userGateway.createToken(data);

    return token;
  }
}
