import { User } from "../../domain/user/entity/user";
import { UserGateway } from "../../domain/user/gateway/user.gateway";
import { Usecase } from "../usecase";

export type FindUserInputDto = {
  id: string;
};
export type FindUserOutputDto = {
  id: string;
  name: string;
  email: string;
};

export class FindUserUsecase
  implements Usecase<FindUserInputDto, FindUserOutputDto>
{
  private constructor(private readonly userGateway: UserGateway) {}

  public static create(userGateway: UserGateway) {
    return new FindUserUsecase(userGateway);
  }

  public async execute({ id }: FindUserInputDto): Promise<FindUserOutputDto> {
    const aUser = await this.userGateway.findById(id);

    const output: FindUserOutputDto = this.presentOutput(aUser);
    return output;
  }

  private presentOutput(user: User): FindUserOutputDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
