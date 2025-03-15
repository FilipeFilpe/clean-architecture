import { NextFunction, Request, Response } from "express";
import { UserGateway } from "../../../../domain/user/gateway/user.gateway";
import { User } from "../../../../domain/user/entity/user";
import { VerifyTokenUsecase } from "../../../../usecases/verify-token/verify-token.usecase";

export class AuthorizationMiddleware {
  private constructor(
    private readonly verifyTokenUsecase: VerifyTokenUsecase
  ) {}

  public static create(verifyTokenUsecase: VerifyTokenUsecase) {
    return new AuthorizationMiddleware(verifyTokenUsecase);
  }

  public async verify(
    request: Request & { user?: User },
    response: Response,
    next: NextFunction
  ) {
    const token = request.headers.authorization?.split(" ")[1]; // Extrai o token do header

    if (!token) {
      return response.status(401).json({ message: "Token not provided" });
    }

    try {
      const user = await this.verifyTokenUsecase.execute({ token });

      if (!user) {
        return response.status(401).json({ message: "Invalid Token" });
      }

      // Adiciona o usuário autenticado à requisição para uso posterior
      request.user = user;

      return next(); // Passa para o próximo middleware ou rota
    } catch (error) {
      return response.status(401).json({ message: "Invalid Token" });
    }
  }
}
