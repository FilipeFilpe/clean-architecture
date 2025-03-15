import { Brand } from "../../domain/brand/entity/brand";
import { BrandGateway } from "../../domain/brand/gateway/brand.gateway";
import { Usecase } from "../usecase";

export type ListBrandInputDto = void;
export type ListBrandOutputDto = {
  brands: Array<{
    id: string;
    name: string;
  }>;
};

export class ListBrandUsecase
  implements Usecase<ListBrandInputDto, ListBrandOutputDto>
{
  private constructor(private readonly brandGateway: BrandGateway) {}

  public static create(brandGateway: BrandGateway) {
    return new ListBrandUsecase(brandGateway);
  }

  public async execute(): Promise<ListBrandOutputDto> {
    const aBrands = await this.brandGateway.list();

    const output: ListBrandOutputDto = this.presentOutput(aBrands);

    return output;
  }

  private presentOutput(brands: Array<Brand>): ListBrandOutputDto {
    return {
      brands: brands.map((b) => {
        return {
          id: b.id,
          name: b.name,
        };
      }),
    };
  }
}
