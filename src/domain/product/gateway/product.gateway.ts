import { Product } from "../entity/product";

export interface ProductGateway {
  save(product: Product): Promise<void>;
  update(product: Product): Promise<void>;
  list(): Promise<Array<Product>>;
  findById(id: string): Promise<Product | null>;
  delete(id: string): Promise<void>;
}
