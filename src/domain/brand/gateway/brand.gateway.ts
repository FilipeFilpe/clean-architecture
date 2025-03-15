import { Brand } from "../../brand/entity/brand";

export interface BrandGateway {
  save(brand: Brand): Promise<void>;
  update(brand: Brand): Promise<void>;
  list(): Promise<Array<Brand>>;
  findById(id: string): Promise<Brand>;
  delete(id: string): Promise<void>;
}
