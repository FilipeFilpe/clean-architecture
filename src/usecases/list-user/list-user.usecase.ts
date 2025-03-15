import { User } from "../../domain/user/entity/user";
import { UserGateway } from "../../domain/user/gateway/user.gateway";
import { Usecase } from "../usecase";

export type ListUserInputDto = void;

export type ListUserOutputDto = {
  users: Array<{
    id: string;
    name: string;
    email: string;
    password: string; // TODO remover
  }>;
};

export class ListUserUsecase
  implements Usecase<ListUserInputDto, ListUserOutputDto>
{
  private constructor(private readonly userGateway: UserGateway) {}

  public static create(userGateway: UserGateway) {
    return new ListUserUsecase(userGateway);
  }

  public async execute(): Promise<ListUserOutputDto> {
    const aUsers = await this.userGateway.list();

    const users = this.presentOutput(aUsers);

    return users;
  }

  private presentOutput(users: Array<User>): ListUserOutputDto {
    return {
      users: users.map(({ id, name, email, password }) => {
        return {
          id,
          name,
          email,
          password,
        };
      }),
    };
  }
}
