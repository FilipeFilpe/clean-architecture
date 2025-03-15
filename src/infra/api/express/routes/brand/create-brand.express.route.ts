import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import {
  CreateBrandInputDto,
  CreateBrandOutputDto,
  CreateBrandUsecase,
} from "../../../../../usecases/create-brand/create-brand.usecase";

export type CreateProductResponseDto = {
  id: string;
};

export class CreateBrandRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createBrandService: CreateBrandUsecase
  ) {}

  public static create(createBrandService: CreateBrandUsecase) {
    return new CreateBrandRoute("/brands", HttpMethod.POST, createBrandService);
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const { name } = request.body;

      const input: CreateBrandInputDto = {
        name,
      };
      const output: CreateBrandOutputDto =
        await this.createBrandService.execute(input);

      const responseBody = this.present(output);

      response.status(201).json(responseBody).send();
    };
  }

  private present(input: CreateProductResponseDto): CreateBrandOutputDto {
    const output: CreateBrandOutputDto = {
      id: input.id,
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
