import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { DeleteProductUsecase } from "../../../../../usecases/delete-product/delete-product.usecase";

export class DeleteProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly deleteProductService: DeleteProductUsecase
  ) {}

  public static create(deleteProductService: DeleteProductUsecase) {
    return new DeleteProductRoute(
      "/products/:id",
      HttpMethod.DELETE,
      deleteProductService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const { id } = request.params;

      try {
        await this.deleteProductService.execute({ id });

        response.status(204).send();
      } catch (error) {
        console.log(`ERRO QUE DEU`, { error });

        response.status(401).send();
      }
    };
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }
}
