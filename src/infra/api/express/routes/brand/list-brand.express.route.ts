import { Request, Response } from "express";
import {
  ListBrandOutputDto,
  ListBrandUsecase,
} from "../../../../../usecases/list-brand/list-brand.usecase";
import { HttpMethod, Route } from "../route";

export type ListBrandResponseDto = {
  brands: Array<{
    id: string;
    name: string;
  }>;
};

export class ListBrandRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listBrandService: ListBrandUsecase
  ) {}

  public static create(listBrandService: ListBrandUsecase) {
    return new ListBrandRoute("/brands", HttpMethod.GET, listBrandService);
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const output = await this.listBrandService.execute();

      const responseBody = this.present(output);

      response.status(200).json(responseBody).send();
    };
  }

  private present(input: ListBrandOutputDto): ListBrandResponseDto {
    const output: ListBrandResponseDto = {
      brands: input.brands.map((b) => {
        return {
          id: b.id,
          name: b.name,
        };
      }),
    };

    return output;
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }
}
