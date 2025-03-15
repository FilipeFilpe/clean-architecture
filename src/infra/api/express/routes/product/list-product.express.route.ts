import { Request, Response } from "express";
import {
  ListProductInputDto,
  ListProductOutputDto,
  ListProductUsecase,
} from "../../../../../usecases/list-product/list-product.usecase";
import { HttpMethod, Route } from "../route";

export type ListProductResponseDto = {
  products: Array<{
    id: string;
    name: string;
    price: number;
    brand: {
      id: string;
      name: string;
    };
  }>;
};

export class ListProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listProductServe: ListProductUsecase
  ) {}

  public static create(listProductServe: ListProductUsecase) {
    return new ListProductRoute("/products", HttpMethod.GET, listProductServe);
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const output = await this.listProductServe.execute();

      const responseBody = this.present(output);

      response.status(200).json(responseBody).send();
    };
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }

  private present(input: ListProductOutputDto): ListProductResponseDto {
    const response: ListProductResponseDto = {
      products: input.products.map((p) => {
        return {
          id: p.id,
          name: p.name,
          price: p.price,
          brand: {
            id: p.brand.id,
            name: p.brand.name,
          },
        };
      }),
    };

    return response;
  }
}
