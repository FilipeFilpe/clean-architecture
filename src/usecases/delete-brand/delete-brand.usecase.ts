import { BrandGateway } from "../../domain/brand/gateway/brand.gateway";
import { Usecase } from "../usecase";

export type DeleteBrandInputDto = {
  id: string;
};
export type DeleteBrandOutputDto = void;

export class DeleteBrandUsecase
  implements Usecase<DeleteBrandInputDto, DeleteBrandOutputDto>
{
  private constructor(private readonly brandGateway: BrandGateway) {}

  public static create(brandGateway: BrandGateway) {
    return new DeleteBrandUsecase(brandGateway);
  }

  public async execute({
    id,
  }: DeleteBrandInputDto): Promise<DeleteBrandOutputDto> {
    try {
      await this.brandGateway.delete(id);
    } catch (error) {
      console.log("Um erro ocorreu", error);
    }
  }
}
