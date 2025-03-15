import { PrismaClient } from "@prisma/client";
import { Brand } from "../../../domain/brand/entity/brand";
import { BrandGateway } from "../../../domain/brand/gateway/brand.gateway";

export class BrandRepositoryPrisma implements BrandGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new BrandRepositoryPrisma(prismaClient);
  }

  public async save(brand: Brand): Promise<void> {
    const data = {
      id: brand.id,
      name: brand.name,
    };
    await this.prismaClient.brand.create({
      data,
    });
  }

  public async update(brand: Brand): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async list(): Promise<Array<Brand>> {
    const data = await this.prismaClient.brand.findMany();

    const brands = data.map((b) => {
      const brand: Brand = Brand.with(b);
      return brand;
    });

    return brands;
  }

  public async findById(id: string): Promise<Brand> {
    const data = await this.prismaClient.brand.findUnique({
      where: {
        id,
      },
    });

    if (!data) {
      throw new Error(`Brand with id ${id} not found`);
    }

    const brand = Brand.with({
      id: data.id,
      name: data.name,
    });

    return brand;
  }

  public async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
