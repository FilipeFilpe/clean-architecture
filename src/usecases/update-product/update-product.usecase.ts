import { Brand } from "../../domain/brand/entity/brand";
import { Product, ProductProps } from "../../domain/product/entity/product";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { Usecase } from "../usecase";

export type UpdateProductInputDto = {
  id: string;
  name: string;
  price: number;
  brand: Brand;
};
export type UpdateProductOutoutDto = void;

export class UpdateProductUsecase
  implements Usecase<UpdateProductInputDto, UpdateProductOutoutDto>
{
  private constructor(private readonly productGateway: ProductGateway) {}

  public static create(productGateway: ProductGateway) {
    return new UpdateProductUsecase(productGateway);
  }

  public async execute({
    id,
    name,
    price,
    brand,
  }: UpdateProductInputDto): Promise<void> {
    const aProduct = await this.productGateway.findById(id);

    const quantity = aProduct ? aProduct.quantity : 0;

    const productProps: ProductProps = {
      id,
      name,
      price,
      quantity,
      brand,
    };
    const aProductUpdate = Product.with(productProps);

    try {
      await this.productGateway.update(aProductUpdate);
    } catch (error) {
      console.log("Um erro ocorreu", error);
    }
  }
}
