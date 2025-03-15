import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import {
  CreateUserInputDto,
  CreateUserOutputDto,
  CreateUserUsecase,
} from "../../../../../usecases/create-user/create-user.usecase";

export type CreateUserResponseDto = {
  id: string;
};

export class CreateUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createUserService: CreateUserUsecase
  ) {}

  public static create(createUserService: CreateUserUsecase) {
    return new CreateUserRoute("/users", HttpMethod.POST, createUserService);
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const { name, email, password } = request.body;

      const input: CreateUserInputDto = {
        name,
        email,
        password,
      };

      const output: CreateUserOutputDto = await this.createUserService.execute({
        name,
        email,
        password,
      });
      const responseBody = this.present(output);

      response.status(201).json(responseBody).send();
    };
  }
  public getPath(): string {
    return this.path;
  }
  public getMethod(): HttpMethod {
    return this.method;
  }

  private present(input: CreateUserOutputDto): CreateUserResponseDto {
    return {
      id: input.id,
    };
  }
}
