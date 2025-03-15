import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { Usecase } from "../usecase";

export type DeleteProductInputDto = {
  id: string;
};

export type DeleteProductOutputDto = void;

export class DeleteProductUsecase
  implements Usecase<DeleteProductInputDto, DeleteProductOutputDto>
{
  private constructor(private readonly productGateway: ProductGateway) {}

  public static create(productGateway: ProductGateway) {
    return new DeleteProductUsecase(productGateway);
  }

  public async execute({ id }: DeleteProductInputDto): Promise<void> {
    await this.productGateway.delete(id);
  }
}
