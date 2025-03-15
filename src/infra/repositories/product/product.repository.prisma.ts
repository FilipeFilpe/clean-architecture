import { PrismaClient } from "@prisma/client";
import { Product } from "../../../domain/product/entity/product";
import { ProductGateway } from "../../../domain/product/gateway/product.gateway";
import { Brand } from "../../../domain/brand/entity/brand";
import { BrandRepositoryPrisma } from "../brand/brand.repository.prisma";

export class ProductRepositoryPrisma implements ProductGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new ProductRepositoryPrisma(prismaClient);
  }

  public async save(product: Product): Promise<void> {
    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      brandId: product.brand.id,
    };

    await this.prismaClient.product.create({
      data,
    });
  }

  public async findById(id: string): Promise<Product | null> {
    const data = await this.prismaClient.product.findUnique({
      where: { id },
      include: {
        brand: true,
      },
    });

    const product = data
      ? Product.with({
          id: data.id,
          name: data.name,
          price: data.price,
          quantity: data.quantity,
          brand: Brand.with(data.brand),
        })
      : null;

    return product;
  }

  public async update(product: Product): Promise<void> {
    const aProduct = await this.findById(product.id);

    if (!aProduct) {
      throw new Error(`Product with id ${product.id} not found`);
    }

    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      brandId: product.brand.id,
    };

    await this.prismaClient.product.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  public async list(): Promise<Array<Product>> {
    const products = await this.prismaClient.product.findMany({
      include: {
        brand: true,
      },
    });

    const productList = products.map((p) => {
      const product = Product.with({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: p.quantity,
        brand: Brand.with(p.brand),
      });
      return product;
    });

    return productList;
  }

  public async delete(id: string) {
    const aProduct = await this.findById(id);

    if (!aProduct) {
      throw new Error(`Product with id ${id} not found`);
    }

    await this.prismaClient.product.delete({
      where: {
        id,
      },
    });
  }
}
