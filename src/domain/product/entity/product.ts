import { Brand } from "../../brand/entity/brand";

export type ProductProps = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  brand: Brand;
};

export class Product {
  // Com o privatre conseguimos acessar a props com o this.
  constructor(private props: ProductProps) {
    // this.validate();
  }

  public static create(name: string, price: number, brand: Brand) {
    return new Product({
      id: crypto.randomUUID().toString(),
      name,
      price,
      quantity: 0,
      brand,
    });
  }

  public static with(props: ProductProps) {
    return new Product(props);
  }

  private validate() {
    if (this.props.quantity < 0) {
      throw new Error("Product quantity great than 0");
    }
  }

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.name;
  }

  public get price() {
    return this.props.price;
  }

  public get quantity() {
    return this.props.quantity;
  }

  public get brand() {
    return this.props.brand;
  }

  public increaseQuantity(quantity: number) {
    this.props.quantity += quantity;
  }

  public decreaseQuantity(quantity: number) {
    this.props.quantity -= quantity;
  }
}
