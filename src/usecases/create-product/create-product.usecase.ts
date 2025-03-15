import { Brand } from "../../domain/brand/entity/brand";
import { Notification } from "../../domain/notification/entity/notification";
import { NotificationGateway } from "../../domain/notification/gateway/notification.gateway";
import { Product } from "../../domain/product/entity/product";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { Usecase } from "../usecase";

export type CreateProductInputDto = {
  name: string;
  price: number;
  brand: Brand;
};

export type CreateProductOutputDto = {
  id: string;
};

export class CreateProductUsecase
  implements Usecase<CreateProductInputDto, CreateProductOutputDto>
{
  private constructor(
    private readonly productGateway: ProductGateway,
    private readonly notificationGateway: NotificationGateway
  ) {}

  public static create(
    productGateway: ProductGateway,
    notificationGateway: NotificationGateway
  ) {
    return new CreateProductUsecase(productGateway, notificationGateway);
  }

  public async execute({
    name,
    price,
    brand,
  }: CreateProductInputDto): Promise<CreateProductOutputDto> {
    const aProduct = Product.create(name, price, brand);

    await this.productGateway.save(aProduct);

    const notification: Notification = Notification.create({
      from: "noreply@filipesousa.dev",
      to: "filpess@hotmail.com",
      message: `Product ${aProduct.name}, created with success!`,
      subject: "New product has created",
    });
    this.notificationGateway.send(notification);
    const output = this.presentOutput(aProduct);

    return output;
  }

  private presentOutput(product: Product): CreateProductOutputDto {
    const output: CreateProductOutputDto = {
      id: product.id,
    };

    return output;
  }
}
