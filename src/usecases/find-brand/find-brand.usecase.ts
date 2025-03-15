import { Brand } from "../../domain/brand/entity/brand";
import { BrandGateway } from "../../domain/brand/gateway/brand.gateway";
import { Usecase } from "../usecase";

export type FindBrandInputDto = {
  id: string;
};

export type FindBrandOutputDto = {
  id: string;
  name: string;
};

export class FindBrandUsecase
  implements Usecase<FindBrandInputDto, FindBrandOutputDto>
{
  private constructor(private readonly brandGateway: BrandGateway) {}

  public static create(brandGateway: BrandGateway) {
    return new FindBrandUsecase(brandGateway);
  }

  public async execute({ id }: FindBrandInputDto): Promise<FindBrandOutputDto> {
    const aBrand = await this.brandGateway.findById(id);
    const output: FindBrandOutputDto = aBrand
      ? this.presentOutput(aBrand)
      : aBrand;

    return output;
  }

  private presentOutput(brand: Brand): FindBrandOutputDto {
    return {
      id: brand.id,
      name: brand.name,
    };
  }
}
