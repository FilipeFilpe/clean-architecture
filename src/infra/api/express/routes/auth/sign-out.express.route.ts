import { Request, Response } from "express";
import { SignOutUsecase } from "../../../../../usecases/sign-out/sign-out.usecase";
import { HttpMethod, Route } from "../route";

export class SignOutRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly signOutUsecase: SignOutUsecase
  ) {}

  public static create(signOutUsecase: SignOutUsecase) {
    return new SignOutRoute("/signout", HttpMethod.GET, signOutUsecase);
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const token = request.headers.authorization?.split(" ")[1];
      if (!token) {
        response.status(401).json({ message: "Token not provided" });
        return;
      }
      await this.signOutUsecase.execute({ token });
      response.status(204).send();
    };
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }
}
