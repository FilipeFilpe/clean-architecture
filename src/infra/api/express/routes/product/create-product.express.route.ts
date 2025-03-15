import { Request, Response } from "express";
import {
  CreateProductInputDto,
  CreateProductUsecase,
} from "../../../../../usecases/create-product/create-product.usecase";
import { HttpMethod, Route } from "../route";
import { FindBrandUsecase } from "../../../../../usecases/find-brand/find-brand.usecase";
import { Brand } from "../../../../../domain/brand/entity/brand";

export type CreateProductResponseDto = {
  id: string;
};

export class CreateProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createProductService: CreateProductUsecase,
    private readonly findBrandService: FindBrandUsecase
  ) {}

  public static create(
    createProductService: CreateProductUsecase,
    findBrandService: FindBrandUsecase
  ) {
    return new CreateProductRoute(
      "/products",
      HttpMethod.POST,
      createProductService,
      findBrandService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const { name, price, brandId } = request.body;

      const brand = await this.findBrandService.execute({ id: brandId });

      const input: CreateProductInputDto = {
        name,
        price,
        brand: Brand.with(brand),
      };

      const output: CreateProductResponseDto =
        await this.createProductService.execute(input);

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

  private present(input: CreateProductResponseDto): CreateProductResponseDto {
    const response = {
      id: input.id,
    };

    return response;
  }
}
