export type BrandProps = {
  id: string;
  name: string;
};

export class Brand {
  private constructor(private readonly props: BrandProps) {}

  public static create(name: string) {
    return new Brand({
      id: crypto.randomUUID().toString(),
      name,
    });
  }

  public static with(props: BrandProps) {
    return new Brand(props);
  }

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.name;
  }
}
