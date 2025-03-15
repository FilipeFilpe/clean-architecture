import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import {
  UpdateProductUsecase,
  UpdateProductInputDto,
} from "../../../../../usecases/update-product/update-product.usecase";
import { FindBrandUsecase } from "../../../../../usecases/find-brand/find-brand.usecase";
import { Brand } from "../../../../../domain/brand/entity/brand";

export class UpdateProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly uptadeProductService: UpdateProductUsecase,
    private readonly findBrandService: FindBrandUsecase
  ) {}

  public static create(
    uptadeProductService: UpdateProductUsecase,
    findBrandService: FindBrandUsecase
  ) {
    return new UpdateProductRoute(
      "/products/:id",
      HttpMethod.PUT,
      uptadeProductService,
      findBrandService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const { id } = request.params;
      const { name, price, brandId } = request.body;

      const brand = await this.findBrandService.execute({ id: brandId });

      const input: UpdateProductInputDto = {
        id,
        name,
        price,
        brand: Brand.with(brand),
      };

      this.uptadeProductService.execute(input);

      response.status(201).send();
    };
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }
}
