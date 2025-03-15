import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import {
  ListUserOutputDto,
  ListUserUsecase,
} from "../../../../../usecases/list-user/list-user.usecase";

export type ListUserResponseDto = {
  users: Array<{
    id: string;
    name: string;
    email: string;
    password: string; // TODO remover
  }>;
};

export class ListUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly userService: ListUserUsecase
  ) {}

  public static create(userService: ListUserUsecase) {
    return new ListUserRoute("/users", HttpMethod.GET, userService);
  }
  public getHandler() {
    return async (request: Request, response: Response) => {
      const aUsers = await this.userService.execute();

      const responseBody = this.present(aUsers);

      response.status(200).json(responseBody).send();
    };
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }

  private present(input: ListUserOutputDto): ListUserResponseDto {
    return {
      users: input.users.map(({ id, name, email, password }) => {
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
