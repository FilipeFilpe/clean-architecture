import { Brand } from "../../domain/brand/entity/brand";
import { BrandGateway } from "../../domain/brand/gateway/brand.gateway";
import { Usecase } from "../usecase";

export type CreateBrandInputDto = {
  name: string;
};

export type CreateBrandOutputDto = {
  id: string;
};

export class CreateBrandUsecase
  implements Usecase<CreateBrandInputDto, CreateBrandOutputDto>
{
  private constructor(private readonly brandGateway: BrandGateway) {}

  public static create(brandGateway: BrandGateway) {
    return new CreateBrandUsecase(brandGateway);
  }

  public async execute({
    name,
  }: CreateBrandInputDto): Promise<CreateBrandOutputDto> {
    const aBrand = Brand.create(name);

    await this.brandGateway.save(aBrand);

    const output = this.presentOutput(aBrand);

    return output;
  }

  private presentOutput(brand: Brand): CreateBrandOutputDto {
    const output: CreateBrandOutputDto = {
      id: brand.id,
    };

    return output;
  }
}
