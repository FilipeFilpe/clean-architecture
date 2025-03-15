import express, { Express } from "express";
import { Api } from "../api";
import { Route } from "./routes/route";
import { AuthorizationMiddleware } from "./middleware/authorization.middleware";
import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { VerifyTokenUsecase } from "../../../usecases/verify-token/verify-token.usecase";

export class ApiExpress implements Api {
  private app: Express;

  private constructor(
    routes: Array<Route>,
    routesPrivate: Array<Route>,
    private readonly verifyTokenUsecase: VerifyTokenUsecase
  ) {
    this.app = express();
    this.app.use(express.json());
    this.addRoutes(routes);
    this.addPrivateRoutes(routesPrivate);
  }

  public static create(
    routes: Array<Route>,
    routesPrivate: Array<Route>,
    verifyTokenUsecase: VerifyTokenUsecase
  ) {
    return new ApiExpress(routes, routesPrivate, verifyTokenUsecase);
  }

  private addRoutes(routes: Array<Route>) {
    routes.forEach((route) => {
      const path = route.getPath();
      const method = route.getMethod();
      const handler = route.getHandler();

      this.app[method](path, handler);
    });
  }

  private addPrivateRoutes(routesPrivate: Array<Route>) {
    const authorizationMiddleware = AuthorizationMiddleware.create(
      this.verifyTokenUsecase
    );
    this.app.use((req, res, next) => {
      authorizationMiddleware.verify(req, res, next);
    });

    routesPrivate.forEach((route) => {
      const path = route.getPath();
      const method = route.getMethod();
      const handler = route.getHandler();

      this.app[method](path, handler);
    });
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      this.listRoutes();
    });
  }

  private listRoutes() {
    const routes = this.app._router.stack
      .filter((route: any) => route.route)
      .map((route: any) => {
        return {
          path: route.route.path,
          method: route.route.stack[0].method,
        };
      });

    console.log(routes);
  }
}
