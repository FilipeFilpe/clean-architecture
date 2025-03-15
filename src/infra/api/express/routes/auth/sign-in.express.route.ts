import { Request, Response } from "express";
import { SignInUsecase } from "../../../../../usecases/sign-in/sign-in.usecase";
import { HttpMethod, Route } from "../route";
import { CreateTokenUsecase } from "../../../../../usecases/create-token/create-token.usecase";

export class SignInRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly signInService: SignInUsecase,
    private readonly createTokenUsecase: CreateTokenUsecase
  ) {}

  public static create(
    signInService: SignInUsecase,
    createTokenUsecase: CreateTokenUsecase
  ) {
    return new SignInRoute(
      "/signin",
      HttpMethod.GET,
      signInService,
      createTokenUsecase
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const [_, hash] = request.headers.authorization?.split(" ") || ["", ""];
      const [email, password] = Buffer.from(hash, "base64")
        .toString()
        .split(":");

      const dataSignInService = await this.signInService.execute({
        email,
        password,
      });

      if (dataSignInService) {
        const { token } = await this.createTokenUsecase.execute({
          data: dataSignInService,
        });
        response.status(200).json(token).send();
        return;
      }
      response.status(401).send();
    };
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }
}
